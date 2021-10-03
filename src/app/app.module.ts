import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/pages/home/blog/blog.component';
import { BlogsComponent } from './components/pages/home/blogs/blogs.component';
import { BlogComponent as BlogPageComponent } from './components/pages/blog/blog/blog-page.component';
import { HeaderComponent } from './components/pages/home/header/header.component';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { BlogEditComponent } from './components/pages/blog/blog-edit/blog-edit.component';
import { FormsModule } from '@angular/forms';
import { BlogPostComponent } from './components/pages/blog/blog-post/blog-post.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogsComponent,
    BlogComponent,
    ToolbarComponent,
    BlogPageComponent,
    BlogEditComponent,
    BlogPostComponent,
    FooterComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
