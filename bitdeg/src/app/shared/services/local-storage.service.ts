import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "@core/utils";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  save = <T>(key: string, data: T): void => {
    if (this.exists(key)) this.remove(key);
    localStorage.setItem(key, JSON.stringify(data));
  };

  get = <T>(key: string): T => {
    if (!isNullOrUndefined(key)) {
      const data = localStorage.getItem(key);
      if (!isNullOrUndefined(data))
        return JSON.parse(localStorage.getItem(key));
    }
    return null;
  };

  remove = (key: string): void =>
    !isNullOrUndefined(key) && localStorage.removeItem(key);

  exists = (key: string): boolean => !!this.get(key);
}
