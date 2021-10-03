import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './components/pages/home/blogs/blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/pages/blog/blog/blog-page.component';
import { BlogEditComponent } from './components/pages/blog/blog-edit/blog-edit.component';
import { BlogPostComponent } from './components/pages/blog/blog-post/blog-post.component';

const appRoutes: Routes = [
  { path: '', component: BlogsComponent },
  { path: 'blogs/:name', component: BlogComponent },
  { path: 'blogs/:name/edit', component: BlogEditComponent },
  { path: 'blog/post', component: BlogPostComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
