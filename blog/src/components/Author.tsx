/** @jsx jsx */
import { jsx } from "theme-ui";
import { Author as AuthorType } from "types";
import GithubProfileLink from "./GithubProfileLink";

type AuthorProps = {
  author: AuthorType;
};

const Author = ({ author }: AuthorProps) => {
  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        py: "20px",
        px: ["10px", "15px", "25px"],
        borderTop: "solid 1px #D8D8D8",
        borderBottom: "solid 1px #D8D8D8",
      }}
    >
      <div
        sx={{
          position: "relative",
          minWidth: ["50px", "60px", "70px"],
          maxWidth: ["50px", "60px", "70px"],
          height: ["50px", "60px", "75px"],
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <img
          sx={{
            height: "auto",
            width: "100%",
          }}
          src={author.avatar.publicURL}
          alt="author iamge"
        />
      </div>
      <div
        sx={{
          marginLeft: ["8px", "10px", "15px"],
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          sx={{
            fontWeight: 500,
            fontSize: [14, 18],
            display: "flex",
            alignItems: "center",
          }}
        >
          {author.name}
          {author.github && (
            <GithubProfileLink
              sx={{
                marginLeft: "10px",
              }}
              to={author.github}
            />
          )}
        </span>
        <span
          sx={{
            fontSize: [12, 13, 14],
          }}
        >
          {author.bio}
        </span>
      </div>
    </div>
  );
};

export default Author;
