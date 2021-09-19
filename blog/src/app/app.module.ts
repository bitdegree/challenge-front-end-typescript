import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogHeaderComponent } from './components/blog-header/blog-header.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './store/reducers/login.reducer';

@NgModule({
  declarations: [
    AppComponent,
    BlogHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ state : loginReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
