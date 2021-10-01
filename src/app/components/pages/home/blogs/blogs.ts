export interface Blog {
  id: number;
  userId: number;
  title: string;
  body: string;
  primaryTitle?: string;
  secondaryTitle?: string;
  photo?: string;
}

export interface Blogs {
  [key: number]: Blog[];
}

export interface SortedBlog {
  user: number;
  blogs: Blog[];
  photo: string;
}

export interface NewBlog {
  title: string;
  blog: string;
}

export interface UpdatedBlog {
  title: string;
  blog: string;
}
