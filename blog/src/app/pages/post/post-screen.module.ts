import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeScreenComponent } from '../home/screen/home-screen.component';
import { PostScreenComponent } from './screen/post-screen.component';
import { WriterHeaderComponent } from './components/writer-header/writer-header.component';
import { PostBodyComponent } from './components/post-body/post-body.component';
import { CommentBodyComponent } from './components/comment-body/comment-body.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { WriterInfoBoxComponent } from './components/writer-info-box/writer-info-box.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
@NgModule({
  declarations: [
    
    PostScreenComponent,
          WriterHeaderComponent,
          PostBodyComponent,
          CommentBodyComponent,
          CommentCardComponent,
          WriterInfoBoxComponent,
          CommentFormComponent,
          AlertComponent
  ],
  imports: [
    RouterModule.forChild([{
        path: '',
        pathMatch: 'full',
        component: PostScreenComponent
      }]),
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class PostScreenModule { }