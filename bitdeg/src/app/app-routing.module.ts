import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/guards/auth.guard";
import {
  HomeComponent,
  PostDetailsComponent,
  PostFormComponent,
  PostListComponent,
} from "./index";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", component: PostListComponent },
      { path: "posts/:slug/:uId/:pId", component: PostDetailsComponent },
      {
        path: "create-post",
        component: PostFormComponent,
        canActivate: [AuthGuard],
      },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
