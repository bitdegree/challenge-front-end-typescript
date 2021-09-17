import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeScreenComponent } from './screen/home-screen.component';
import { PostCardComponent } from './components/post-card/post-card.component';
@NgModule({
  declarations: [
    HomeScreenComponent,
    PostCardComponent
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