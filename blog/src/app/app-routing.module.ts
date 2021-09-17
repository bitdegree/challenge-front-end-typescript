import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    pathMatch:'full'
  },
  {
    path:'post',
    loadChildren: () => import('./pages/post/post-screen.module').then(m => m.PostScreenModule),
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
