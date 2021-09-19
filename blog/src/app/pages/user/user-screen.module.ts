import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserScreenComponent } from './screen/user-screen.component';
import { LatestPostComponent } from './components/latest-post/latest-post.component';
import { UserInfoSectionComponent } from './components/user-info-section/user-info-section.component';
@NgModule({
  declarations: [
    UserScreenComponent,
    LatestPostComponent,
    UserInfoSectionComponent
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