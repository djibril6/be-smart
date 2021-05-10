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
  NbSelectModule,
  NbSpinnerModule,
  NbAutocompleteModule,
  NbUserModule,
  NbIconModule,
  NbCardModule,
  NbTooltipModule,
  NbDatepickerModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserService } from './user/services/user.service';
import { UserComponent } from './user/user.component';
import {AddUserComponent} from './user/components/add-user.component';
import { MyAccountComponent } from './user/components/my-account/my-account.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardTitle, ProjectComponent, SingleTask } from './project/project.component';
import { CreateProjectComponent } from './project/components/create-project/create-project.component';
import { ProjectService } from './project/services/project.service';
import { CreateCardComponent } from './project/components/create-card/create-card.component';
import { ManageTeamComponent } from './project/components/manage-team/manage-team.component';
import { CreateTaskComponent } from './project/components/create-task/create-task.component';


@NgModule({
  declarations: [
    PageComponent, 
    HomeComponent, 
    UserComponent,
    AddUserComponent,
    MyAccountComponent,
    ProjectComponent,
    CreateProjectComponent,
    CreateCardComponent,
    ManageTeamComponent,
    CreateTaskComponent,
    CardTitle,
    SingleTask
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
    NbSelectModule,
    NbSpinnerModule,
    NbAutocompleteModule,
    NbUserModule,
    NbIconModule,
    NbCardModule,
    NbTooltipModule,
    NbDatepickerModule.forRoot(),
  ],
  providers: [UserService, ProjectService]
})
export class PagesModule { }
