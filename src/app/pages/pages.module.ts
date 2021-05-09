import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.component';
import { HomeComponent } from './home/home.component';
import { NbThemeModule, 
  NbLayoutModule, 
  NbWindowModule, 
  NbToastrModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserService } from './user/services/user.service';
import { UserComponent } from './user/user.component';
import {AddUserComponent} from './user/components/add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageComponent, 
    HomeComponent, 
    UserComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    PageRoutingModule,
    NbEvaIconsModule,
    Ng2SmartTableModule,
    NbWindowModule.forChild(),
    NbToastrModule.forRoot(),
    NbInputModule,
    NbButtonModule,
    NbSelectModule
  ],
  providers: [UserService]
})
export class PagesModule { }
