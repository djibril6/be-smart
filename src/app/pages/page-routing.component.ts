import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
          {
            path: 'home',
            component: HomeComponent
          },
          {
            path: 'users',
            component: UserComponent
          },
          {
            path: 'project',
            component: ProjectComponent
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
