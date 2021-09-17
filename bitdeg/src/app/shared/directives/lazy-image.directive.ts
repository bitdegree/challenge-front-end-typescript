import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from "@angular/core";
import { generateRandomColor } from "@core/utils";

@Directive({
  selector: "[bitdegLazyImage]",
})
export class LazyImageDirective {
  @HostBinding("src") imageUrl: string;
  @Input() bitdegLazyImage: string = "";
  constructor(private el: ElementRef) {}

  @HostListener("window:scroll", ["$event"]) lazyLoadImage(): void {
    this.isImageInView() && this.loadImage();
  }

  private isImageInView = (): boolean => {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return rect.top >= 0;
  };

  private loadImage = (): void => {
    const img = new Image(150, 150);
    img.src = this.replaceHex(this.bitdegLazyImage);
    img.onload = () => {
      this.imageUrl = img.src;
    };
    img.onerror = () => {
      this.imageUrl = this.imageUrl;
    };
  };

  private replaceHex = (url: string): string => {
    return url.replace(url.substr(url.lastIndexOf("/")), generateRandomColor());
  };
}
