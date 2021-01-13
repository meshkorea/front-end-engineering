/** @jsx jsx */
import { Link } from "gatsby";
import React from "react";

import { jsx, Link as TLink } from "theme-ui";

type ItemAuthorProps = {
  author: {
    id: string;
    name: string;
  },
}

const ItemAuthor = ({ author }: ItemAuthorProps) => (
  <span>{author.name}</span>
)

export default ItemAuthor;