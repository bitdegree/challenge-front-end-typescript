import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LazyImageDirective, HeaderComponent, FooterComponent } from "./index";

@NgModule({
  declarations: [LazyImageDirective, HeaderComponent, FooterComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [LazyImageDirective, HeaderComponent, FooterComponent],
})
export class SharedModule {}
