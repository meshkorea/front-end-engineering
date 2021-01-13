import React from "react"

type TagsProps = {
  tags: string[];
}

const ItemTags = ({ tags }: TagsProps) => {
  const tagDelimiter = " ";
  const tagPrefix = "#";
  return (
    <React.Fragment>
      {tags.map((tag, i) => (
        <React.Fragment key={tag}>
          {!!i && tagDelimiter}
          <span>
            {`${tagPrefix}${tag}`}
          </span>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default ItemTags
