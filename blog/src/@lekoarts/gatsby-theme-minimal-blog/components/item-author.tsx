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
  <TLink as={Link} to={author.id}>{author.name}</TLink>
)

export default ItemAuthor;