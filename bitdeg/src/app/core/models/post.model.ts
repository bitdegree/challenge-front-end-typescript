import { BaseModel } from "./base.model";

class Post extends BaseModel {
  userId: number;
  title: string;
  body: string;
}

export { Post };
