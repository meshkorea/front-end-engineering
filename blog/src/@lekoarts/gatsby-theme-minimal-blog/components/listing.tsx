/** @jsx jsx */
import { jsx } from "theme-ui";

import { Post } from "../../../types";
import BlogListItem from "./blog-list-item";

type ListingProps = {
  posts: Post[];
  className?: string;
  showTags?: boolean;
};

const Listing = ({ posts, className = ``, showTags = true }: ListingProps) => (
  <section sx={{ mb: [5, 6, 7] }} className={className}>
    {posts.map((post) => (
      <BlogListItem key={post.slug} post={post} showTags={showTags} />
    ))}
  </section>
);

export default Listing;
