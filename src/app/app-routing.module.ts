import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'page',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'auth' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
