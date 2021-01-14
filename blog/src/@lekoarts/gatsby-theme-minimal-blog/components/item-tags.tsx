import React from "react"
import { Tag } from "../../../types";

type TagsProps = {
  tags: Tag[]
}

const ItemTags = ({ tags }: TagsProps) => {
  const tagDelimiter = " ";
  const tagPrefix = "#";
  return (
    <React.Fragment>
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && tagDelimiter}
          <span>
            {`${tagPrefix}${tag.name}`}
          </span>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default ItemTags
