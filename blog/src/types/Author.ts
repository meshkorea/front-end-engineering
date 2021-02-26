type Author = {
  id: string;
  name: string;
  bio: string;
  github?: string;
  avatar: {
    publicURL: string;
  };
};

export default Author;
