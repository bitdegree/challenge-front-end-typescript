import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class LoginScreenModule { }