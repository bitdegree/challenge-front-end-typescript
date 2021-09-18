import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserScreenComponent } from './screen/user-screen.component';
@NgModule({
  declarations: [
    UserScreenComponent
  ],
  imports: [
    RouterModule.forChild([{
        path: '',
        pathMatch: 'full',
        component: UserScreenComponent
      }]),
  ],
  providers: [
  ],
})
export class UserScreenModule { }