import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
@NgModule({
  declarations: [
    LoginScreenComponent
  ],
  imports: [
    RouterModule.forChild([{
        path: '',
        pathMatch: 'full',
        component: LoginScreenComponent
      }]),
    CommonModule
  ],
  providers: [
  ],
})
export class LoginScreenModule { }