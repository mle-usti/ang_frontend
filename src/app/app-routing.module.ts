import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalsComponent } from './main/animals/animals.component';
import { LoginComponent } from './main/login/login.component';
import { ProfileComponent } from './main/profile/profile.component';
import { RegisterComponent } from './main/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import {LoginGaurdGuard} from './services/login-gaurd.guard'

const routes: Routes = [
   
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: 'sign-up',
    component: RegisterComponent,
    canActivate:[LoginGaurdGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[LoginGaurdGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuardService] 
  },
  {
    path:'animals',
    component:AnimalsComponent,
    canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }