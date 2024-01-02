import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";



const routes: Routes = [
  { path: 'users', component: UsersListComponent,canActivate: [AuthGuard] },
  {path:'login',component: LoginComponent},
  {path:'profile',component: ProfileComponent,canActivate: [AuthGuard]},
  {path: '', redirectTo:'login', pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
