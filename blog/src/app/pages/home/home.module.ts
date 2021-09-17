import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeScreenComponent } from './screen/home-screen.component';
@NgModule({
  declarations: [
    HomeScreenComponent
    ],
  imports: [
    RouterModule.forChild([{
        path: '',
        pathMatch: 'full',
        component: HomeScreenComponent
      }]),
    CommonModule
  ],
  providers: [
  ],
})
export class HomeModule { }