import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";

import { LazyImageDirective, HeaderComponent, FooterComponent } from "./index";

@NgModule({
  declarations: [LazyImageDirective, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  exports: [LazyImageDirective, HeaderComponent, FooterComponent],
})
export class SharedModule {}
