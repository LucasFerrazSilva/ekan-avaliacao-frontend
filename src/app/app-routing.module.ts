import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BeneficiariosComponent } from './beneficiarios/beneficiarios.component';
import { authGuard } from './auth/auth.guard';
import { NovoBeneficiarioComponent } from './beneficiarios/novo-beneficiario/novo-beneficiario.component';

const routes: Routes = [
  { path: '', component: BeneficiariosComponent, canActivate: [authGuard] },
  { path: 'novo', component: NovoBeneficiarioComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
