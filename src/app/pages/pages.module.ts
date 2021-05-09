import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.component';
import { HomeComponent } from './home/home.component';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserService } from './user/services/user.service';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [PageComponent, HomeComponent, UserComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    PageRoutingModule,
    NbEvaIconsModule,
    Ng2SmartTableModule
  ],
  providers: [UserService]
})
export class PagesModule { }
