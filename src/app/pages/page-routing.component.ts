import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page.component';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
          {
            path: 'home',
            // canActivate: [AuthGuard],
            component: HomeComponent
          },
          {
            // path: 'users',
            // canActivate: [AuthGuard],
            // component: IndicateurComponent
          },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { 
            path: '**', 
            redirectTo: 'home' 
          }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
