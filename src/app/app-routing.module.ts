import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BeneficiariosComponent } from './beneficiarios/beneficiarios.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: BeneficiariosComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
