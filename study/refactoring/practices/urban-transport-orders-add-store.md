# [당일배송 Admin] TransportOrdersAddStore 리팩터링

## 🗣 설명

### 🧐 As is

```typescript
export default class TransportOrdersAddStore {
  @observable
  public transportOrdersFileName = "";

  @observable
  public beforeValidationPassedForms: TransportOrdersAddForm[] = [];

  @observable
  public validationPassedForms: TransportOrdersAddForm[] = [];

  @observable
  public isFileLoaded = false;

  @observable
  public transportOrdersFileReadableData?: ExcelJsonRows;

  @observable
  public canUpload = false;

  @observable
  public isPreparingForUpload = false;

  @observable
  public minTransportDate: Date = new Date();

  private authStore: AuthStore;

  private globalStore: GlobalStore;

  private transportRoundStore: TransportRoundStore;

  private transportOrdersAddResultStore: TransportOrdersAddResultStore;

  private failedOrderStatementStore: FailedOrderStatementStore;

  private service: TransportOrdersAddService;

  public constructor(
    authStore: AuthStore,
    globalStore: GlobalStore,
    transportRoundStore: TransportRoundStore,
    transportOrdersAddResultStore: TransportOrdersAddResultStore,
    failedOrderStatementStore: FailedOrderStatementStore,
  ) {
    this.authStore = authStore;
    this.globalStore = globalStore;
    this.transportRoundStore = transportRoundStore;
    this.transportOrdersAddResultStore = transportOrdersAddResultStore;
    this.failedOrderStatementStore = failedOrderStatementStore;
    this.service = new TransportOrdersAddService(authStore);
    this.resetFileUploadProgress();

    observe(authStore, "shipperId", change => {
      if (change.oldValue && change.oldValue !== change.newValue)
        this.resetFileUploadProgress();
    });
  }

  @action
  public resetFileUploadProgress = () => {
    this.transportOrdersFileName = "";
    this.isPreparingForUpload = false;
    this.canUpload = false;
    this.beforeValidationPassedForms = [];
    this.validationPassedForms = [];
    this.initTransportDate();
  };

  @action.bound
  public loadFile = async (files: File[]) => {
    if (files.length > 1) {
      throw await formatError("파일을 한개만 선택해주세요.");
    }

    const [file] = files;

    if (!file) {
      throw await formatError("파일을 선택해주세요.");
    }

    if (file.name && file.name.length > 255) {
      throw await formatError("파일명은 250자까지 가능합니다.");
    }

    const isValidExcelFile = this.validateExcelFileFormat(file);

    if (!isValidExcelFile) {
      throw await formatError(
        "잘못된 파일 형식입니다. 확장자가 xls, xlsx인 파일을 선택해주세요.",
      );
    }

    const [requiredHeaders] = await fileReader(file, "A7:J7");
    const isValidHeaders = Object.values(
      TransportOrdersAddRequiredCategory,
    ).every((header, i) => requiredHeaders?.[i] === header);

    if (!isValidHeaders) {
      throw await formatError(
        "잘못된 등록 양식입니다. 주문 등록 양식을 확인해주세요.",
      );
    }

    const contents = await fileReader(file, 7);

    const cleanContents = this.cleanTransportOrdersData(contents);
    const hasAnyContents = !!cleanContents.length;

    if (!cleanContents.length || !hasAnyContents) {
      throw await formatError(
        "업로드 할 주문 정보가 없습니다. 파일을 확인해 주세요.",
      );
    }

    if (cleanContents.length > MAX_CLEAN_CONTENTS_LENGTH) {
      throw await formatError(
        "한번에 등록 가능한 주문 수를 초과했습니다. 2000개 주문까지 등록해주세요.",
      );
    }

    runInAction(() => {
      this.transportOrdersFileName = file.name;
      this.isFileLoaded = true;
      this.transportOrdersFileReadableData = cleanContents;
    });
  };

  @action.bound
  public parseFile = async () => {
    if (!this.isFileLoaded || !this.transportOrdersFileReadableData) {
      throw await formatError("업로드 할 파일을 선택해주세요.");
    }

    this.beforeValidationPassedForms = this.transportOrdersFileReadableData!.map(
      orderData => this.parseExcelRow(orderData),
    );
  };

  @action
  public validateBeforeUpload = async () => {
    const tasks = this.beforeValidationPassedForms.map(form => form.validate());
    const beforePassedForms: TransportOrdersAddForm[] = [];

    (await Promise.all(tasks)).forEach((isValid, i) => {
      runInAction(() => {
        const form = this.beforeValidationPassedForms[i];

        if (isValid) {
          this.validationPassedForms.push(form);
        } else {
          beforePassedForms.push(form);
        }
      });
    });

    runInAction(() => {
      this.beforeValidationPassedForms = beforePassedForms;
    });
  };

  @action
  public showValidationFailedResult = () => {
    const failedCount = this.beforeValidationPassedForms.length;
    const totalCount = this.validationPassedForms.length + failedCount;
    const failedDisplayList = this.beforeValidationPassedForms.slice(0, 12);
    const restFailedCount = failedCount - failedDisplayList.length;

    this.globalStore.openAlert({
      title: " ",
      message: (
        <TransportOrdersValidationFailedMessage
          totalCount={totalCount}
          failedCount={failedCount}
          failedListMessage={failedDisplayList
            .map(f =>
              f.shipperSalesOrderId?.length
                ? f.shipperSalesOrderId
                : "주문번호 없음",
            )
            .join(", ")
            .concat(restFailedCount > 0 ? ` 외 ${restFailedCount}건` : "")}
        />
      ),
      onConfirm: () => this.resetFileUploadProgress(),
    });
  };

  @action.bound
  public prepareToUpload = async (files: File[]) => {
    try {
      this.resetFileUploadProgress();
      this.isPreparingForUpload = true;
      this.isFileLoaded = false;
      await this.loadFile(files);
      await this.parseFile();
      await this.validateBeforeUpload();

      if (
        this.beforeValidationPassedForms &&
        this.beforeValidationPassedForms.length
      ) {
        this.showValidationFailedResult();
        // this.resetFileUploadProgress();
        return;
      }
      runInAction(() => {
        this.isPreparingForUpload = false;
        this.canUpload = true;
      });
    } catch (e) {
      runInAction(() => {
        this.resetFileUploadProgress();
        this.globalStore.openAlert({
          message:
            e.displayMessage || "주문 파일 검증 도중 문제가 발생했습니다.",
        });
      });
    }
  };

  @action.bound
  public uploadTransportOrderStatements = async () => {
    // canUpload 가 true 일때만 버튼을 클릭해서 이 액션이 실행 됨
    try {
      if (!this.canUpload) {
        throw await formatError("업로드할 파일을 먼저 선택해주세요.");
      }
      this.globalStore.openSpinner({
        message: "파일 업로드 중입니다",
      });

      const needsHomeDeliveryParcels = new Map<string, ParcelBase[]>();
      const formattedItems: TransportOrderStatementLineItem[] = this.validationPassedForms
        .sort((a, b) => {
          if (a.parcelSize === ParcelSize.LARGE) {
            return -1;
          }
          if (b.parcelSize === ParcelSize.LARGE) {
            return 1;
          }
          return 0;
        })
        .map(form => {
          const formatted = {
            ...form,
            customer: {
              name: form.customerName,
              phone: form.customerPhone,
            },
            customerAddress: {
              postAddress: form.postAddress,
              detailAddress: form.detailAddress,
            },
            parcels: [
              {
                size: this.formatParcelSize(form.parcelSize),
                contents: form.parcelContents,
              },
            ],
            fragile: this.formatFragile(form.fragile),
          };

          if (needsHomeDeliveryParcels.has(form.shipperSalesOrderId)) {
            const prev =
              needsHomeDeliveryParcels.get(form.shipperSalesOrderId) || [];
            needsHomeDeliveryParcels.set(form.shipperSalesOrderId, [
              ...prev,
              ...formatted.parcels,
            ]);
            return undefined;
          }

          if (form.parcelSize === ParcelSize.LARGE) {
            const prev =
              needsHomeDeliveryParcels.get(form.shipperSalesOrderId) || [];
            needsHomeDeliveryParcels.set(form.shipperSalesOrderId, [
              ...prev,
              ...formatted.parcels,
            ]);
          }

          return formatted;
        })
        .filter(o => o !== undefined) as TransportOrderStatementLineItem[];

      const items = formattedItems.map(f => {
        if (needsHomeDeliveryParcels.has(f?.shipperSalesOrderId!)) {
          return {
            ...f,
            parcels: needsHomeDeliveryParcels.get(f?.shipperSalesOrderId!)!,
          };
        }
        return f;
      });

      await this.service.addTransportOrdersForShipper({
        TransportOrderStatement: {
          shipperId: this.authStore.shipperId!,
          transportServiceType: TransportServiceType.ONEDAYDELIVERY,
          transportDate: this.transportRoundStore.transportRoundDate,
          roundNumber: this.transportRoundStore.transportRoundNumber,
          fileName: this.transportOrdersFileName!,
          lineItems: items,
        },
      });

      await delay(2000);

      this.globalStore.openAlert({
        message: (
          <Block alignItems="center">
            <Block>주문서 등록이 성공했습니다.</Block>
            <Block>업로드 내역에 반영되기까지 시간이 걸릴 수 있습니다.</Block>
          </Block>
        ),
        onConfirm: () => {
          this.transportOrdersAddResultStore.search();
        },
      });
    } catch (e) {
      let message = e.displayMessage;

      if (e?.response.status === 403) {
        message = "주문 생성 권한이 없습니다.";
      }
      this.globalStore.openAlert({
        message,
      });
    } finally {
      this.resetFileUploadProgress();
      this.globalStore.closeSpinner();
    }
  };

  public openConfirmDownloadExcel(statementId: string) {
    this.globalStore.openAlert({
      message: "업로드에 실패한 주문 목록을 엑셀 파일로 다운로드 하시겠습니까?",
      isCancelShown: true,
      onConfirm: async () => {
        await this.failedOrderStatementStore.downloadFailedOrders(statementId);
        this.globalStore.openAlert("다운로드가 완료되었습니다.");
      },
    });
  }

  private formatFragile = (fragile: string) => {
    return fragile === "O";
  };

  private cleanTransportOrdersData = (rows: ExcelJsonRows) => {
    return rows.filter(row => !this.isEmptyRow(row));
  };

  private isEmptyRow = (row: ExcelJsonRow) => {
    return !row.join("").length;
  };

  private validateExcelFileFormat = (file: File) => {
    if (!file) {
      return false;
    }

    const allowedExtensions = ["xlsx", "xls"];
    const extension = file.name.split(".").pop();

    if (!extension || !allowedExtensions.includes(extension)) {
      return false;
    }

    return true;
  };

  private formatParcelSize = (size: string) => {
    switch (size) {
      case ParcelSize.LARGE:
        return ParcelSizeSource.LARGE;
      case ParcelSize.MEDIUM:
        return ParcelSizeSource.MEDIUM;
      case ParcelSize.SMALL:
        return ParcelSizeSource.SMALL;
      default:
        return ParcelSizeSource.TINY;
    }
  };

  private parseExcelRow = (orderData: ExcelJsonRow) => {
    const form = new TransportOrdersAddForm();

    transportOrdersAddKeys.forEach(({ key }, i) => {
      let value: string | number = orderData[i];
      if (typeof value === "string") {
        value = value.trim();
      }

      form.update({
        [key]: value,
      });
    });

    return form;
  };

  private initTransportDate = () => {
    const now = new Date();
    const todayLimit = setHours(startOfToday(), 14);
    const tomorrow = addDays(now, 1);
    const minTransportDate = isAfter(now, todayLimit) ? tomorrow : now;

    this.transportRoundStore.transportRoundDate = minTransportDate;
    this.minTransportDate = minTransportDate;
  };
}
```

### 📋 상세

- 운송 주문 엑셀 파일을 업로드 하기 위한 스토어.
- 파일 처리와 관련된 비즈니스 로직이 AddStore에 모두 합쳐져 있어서 Store의 관심사가 다양하고 내용이 비대해졌다.
- 파일 처리 (엑셀 파일 값 검증 로직)은 정책과 관련된 부분이라 변경이 빈번하지 않은데도 뷰 로직과 스토어에서 섞여있다.
- 리팩토링 우선순위는 `prepareToUpload` 와 `uploadTransportOrderStatements` 자신과 내부에서 참조하는 메서드 입니다.

### ✨목표

- 관심사를 분리해서 스토어에서 뷰 로직을 담도록 하고, 비즈니스 로직은 안쪽 레이어에서 관리하도록 한다.
- 함수 쪼개기로 각 메소드를 나누고 필요한 부분은 재사용 가능하도록 변경해서 재사용성을 높인다.
- 좀 더 파악하기 쉬운 함수 이름으로 변경해서 관리를 쉽게 한다.
