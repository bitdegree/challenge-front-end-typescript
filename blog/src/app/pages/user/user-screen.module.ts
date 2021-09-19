import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserScreenComponent } from './screen/user-screen.component';
import { LatestPostComponent } from './components/latest-post/latest-post.component';
@NgModule({
  declarations: [
    UserScreenComponent,
    LatestPostComponent
  ],
  imports: [
    RouterModule.forChild([{
        path: '',
        pathMatch: 'full',
        component: UserScreenComponent
      }]),
    CommonModule
  ],
  providers: [
  ],
})
export class UserScreenModule { }