# [TMS] DriversSelect 컴포넌트 리팩터링

## 🗣 설명

### 🧐 As is

```tsx
<>
  <AvailableDriverSection>
    <SectionHeader>
      <CountLabel>
        <FormattedMessage {...driversSelectMessages.assignableDriverCount} />
        <StyledStrong>
          {selectable.length}
          <FormattedMessage {...driversSelectMessages.unit} />
        </StyledStrong>
      </CountLabel>
      <SearchInput
        width="200px"
        placeholder={intl.formatMessage(
          driversSelectMessages.searchBoxPlaceholder
        )}
        onChange={updateSelectableDriverFilter}
      />
    </SectionHeader>
    <Table width="400px" height="475px">
      <Thead>
        <Tr>
          <Th textEllipsis>
            <Checkbox
              disabled={selectableDriverFilter !== ""}
              onChange={checkAllSelectableHandler}
              checked={
                checkedSelectableDrivers.size === selectable.length &&
                selectable.length !== 0
              }
              indeterminate={
                checkedSelectableDrivers.size !== selectable.length &&
                checkedSelectableDrivers.size !== 0
              }
              optionLabel={intl.formatMessage(driversSelectMessages.name)}
            />
          </Th>
          <Th textAlign="center">
            <FormattedMessage {...driversSelectMessages.courier} />
          </Th>
          <Th textAlign="center">
            <FormattedMessage {...driversSelectMessages.driverInfo} />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredSelectable.map((driver) => (
          <Tr key={driver.key}>
            <Td textEllipsis>
              <DriverCheckbox
                onChange={checkSelectableDriver}
                id={driver.key}
                checked={checkedSelectableDrivers.has(driver.key)}
                optionLabel={driver.value.compactDriverDto.name}
              />
            </Td>
            <Td textAlign="center" textEllipsis>
              {driver.value.compactDriverDto.courierName}
            </Td>
            <Td textAlign="center">
              <StyledButton
                width="100px"
                minWidth="100px"
                onClick={driverDetailInfoClick}
                data-id={driver.key}
              >
                <FormattedMessage
                  {...driversSelectMessages.detailButtonLabel}
                />
              </StyledButton>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </AvailableDriverSection>
  <ArrowSection>
    <StyledIcon
      name="ARROW_LEFT"
      width="36px"
      height="36px"
      marginTop="247px"
      marginBottom="22px"
      onClick={() => {
        unselectDrivers(checkedSelectedDrivers);
        clearSelectedDrivers();
      }}
    />
    <StyledIcon
      name="ARROW_RIGHT"
      width="36px"
      height="36px"
      onClick={() => {
        selectDrivers(checkedSelectableDrivers);
        clearSelectableDrivers();
      }}
    />
  </ArrowSection>
  <SelectedDriverSection>
    <SectionHeader>
      <CountLabel>
        <FormattedMessage {...driversSelectMessages.assignedDriverCount} />
        <StyledStrong>
          {selected.length}
          <FormattedMessage {...driversSelectMessages.unit} />
        </StyledStrong>
      </CountLabel>
      <SearchInput
        width="200px"
        placeholder={intl.formatMessage(
          driversSelectMessages.searchBoxPlaceholder
        )}
        onChange={updateSelectedDriverFilter}
      />
    </SectionHeader>
    <Table width="400px" height="475px">
      <Thead>
        <Tr>
          <Th textEllipsis>
            <Checkbox
              onChange={checkAllSelectedHandler}
              disabled={selectableDriverFilter !== ""}
              checked={
                checkedSelectedDrivers.size === selected.length &&
                selected.length !== 0
              }
              indeterminate={
                checkedSelectedDrivers.size !== selected.length &&
                checkedSelectedDrivers.size !== 0
              }
              optionLabel={intl.formatMessage(driversSelectMessages.name)}
            />
          </Th>
          <Th textAlign="center">
            <FormattedMessage {...driversSelectMessages.courier} />
          </Th>
          <Th textAlign="center">
            <FormattedMessage {...driversSelectMessages.driverInfo} />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredSelected.map((driver) => (
          <Tr key={driver.key}>
            <Td textEllipsis>
              <DriverCheckbox
                onChange={checkSelectedDriver}
                id={driver.key}
                checked={checkedSelectedDrivers.has(driver.key)}
                optionLabel={driver.value.compactDriverDto.name}
              />
            </Td>
            <Td textAlign="center" textEllipsis>
              {driver.value.compactDriverDto.courierName}
            </Td>
            <Td textAlign="center">
              <StyledButton
                width="100px"
                minWidth="100px"
                onClick={driverDetailInfoClick}
                data-id={driver.key}
              >
                <FormattedMessage
                  {...driversSelectMessages.detailButtonLabel}
                />
              </StyledButton>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </SelectedDriverSection>
  {driverInfoModal.isModalOpen ? (
    <DriverDetailProvider>
      <DriverInfoModal
        driverId={driverInfoModal.driverId}
        onClose={driverInfoModalClose}
      />
    </DriverDetailProvider>
  ) : null}
</>
```

### 📋 상세

TMS 개발중 급하게 기능 동작을 목표로 작업하다 보니
기사 선택 ui 내부 코드가 repetitive하고 이해하기 어렵게 되어있다.

### ✨목표

- 해당 컴포넌트 내부를 더욱 컴포넌트화 시켜 구조를 파악하기 쉽게 한다.
- 움직이는 데이터들과 함수의 이름을 정리해 코드를 이해하기 쉽게 한다.
- 중복되는 코드를 컴포넌트화를 통해 제거한다.

### **⚙️ 절차**

## 📝메모

용준님과 페어 프로그래밍을 해 피드백 받은 것을 기반으로 해당 컴포넌트 리펙터링 작업을 진행하겠습니다.
비록 컴포넌트 리팩터링이지만 일반 js 리펙터링과 연결되는 개념이 있을 것이기 때문에 책에 나오는 리팩터링 기법과 연결시켜보며 작업을 진행해 보겠습니다.
