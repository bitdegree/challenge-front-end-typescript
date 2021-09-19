import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostCreateScreenComponent } from './post-create-screen/post-create-screen.component';
@NgModule({
  declarations: [
    PostCreateScreenComponent
  ],
  imports: [
    RouterModule.forChild([{
        path: '',
        pathMatch: 'full',
        component: PostCreateScreenComponent
      }]),
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class PostCreateScreenModule { }