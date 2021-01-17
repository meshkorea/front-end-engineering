/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Link } from "gatsby";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";

import { Tag } from "../../../types";

type TagsProps = {
  tags: Tag[];
};

const ItemTags = ({ tags }: TagsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();

  const tagDelimiter = " ";
  const tagPrefix = "#";
  return (
    <React.Fragment>
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && tagDelimiter}
          <Link
            sx={{ opacity: "0.7", textDecoration: "none" }}
            to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
          >
            {`${tagPrefix}${tag.name}`}
          </Link>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default ItemTags;
