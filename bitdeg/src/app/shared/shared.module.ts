import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LazyImageDirective } from "./directives/lazy-image.directive";

@NgModule({
  declarations: [LazyImageDirective],
  imports: [CommonModule],
})
export class SharedModule {}
