import { User } from ".";
import { BaseModel } from "./base.model";

class Post extends BaseModel {
  userId: number;
  title: string;
  body: string;

  filters? = new PostFilters();
}

class BlogPost extends Post {
  images: {
    userAvatar: string;
    thumbnail: string;
    original: string;
  };
  user: User;
}

class PostFilters {
  userId: string;

  constructor() {
    this.userId = "";
  }
}

export { Post, BlogPost };
