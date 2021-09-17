import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeScreenComponent } from '../home/screen/home-screen.component';
import { PostScreenComponent } from './screen/post-screen.component';
@NgModule({
  declarations: [
    
    PostScreenComponent
  ],
  imports: [
    RouterModule.forChild([{
        path: '',
        pathMatch: 'full',
        component: PostScreenComponent
      }]),
    CommonModule
  ],
  providers: [
  ],
})
export class PostScreenModule { }