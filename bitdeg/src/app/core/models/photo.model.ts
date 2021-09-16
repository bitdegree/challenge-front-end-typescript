import { BaseModel } from "./base.model";

class Photo extends BaseModel {
  albumId: number;
  title: number;
  url: string;
  thumbnailUrl: string;
}

export { Photo };
