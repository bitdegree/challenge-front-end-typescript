import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  loadingReqs: Array<{ loading: boolean; url: string }> = [];
  constructor() {}

  setLoading = (state: boolean, url: string): void => {
    if (!url) {
      throw new Error("Loading Service: Request url not set");
    }
    const urlIndex = this.loadingReqs.findIndex((el) => el.url == url);

    if (state) {
      this.loadingReqs.push({ loading: state, url: url });
      this.loading$.next(true);
    } else if (!state && urlIndex > -1) {
      this.loadingReqs.splice(urlIndex, 1);
    }
    if (this.loadingReqs.length < 1) {
      return this.loading$.next(false);
    }
  };

  resetLoadingState = (): void => {
    this.loadingReqs = [];
    this.loading$.next(false);
  };
}
