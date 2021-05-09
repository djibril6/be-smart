import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { ProjectData } from 'src/app/models/project.model';
import { ProjectService } from './services/project.service';
import { NbSidebarService, NbWindowService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { ManageTeamComponent } from './components/manage-team/manage-team.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  id: string;
  project: ProjectData;
  current_user: {
    id: string,
    firstname: string,
    lastname: string,
    role: string,
    email: string,
    state: boolean
  }; 

  constructor(
    private activateRoute: ActivatedRoute,
    private proService: ProjectService ,
    private windowService: NbWindowService, 
    public vg: AppConfig
  ) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.loadData();
  }

  loadData() {
    this.proService.getOneProject(this.id)
    .subscribe(res => {
      this.project = res.body.result;
      this.current_user = this.project.users?.find(item => item.id == this.vg.user._id);
    });
  }

  onCreateCard() {
    this.windowService.open(CreateCardComponent, { title: `Add new Card`, context: {id: this.id, user: {}} }).onClose.subscribe(res => {
      this.loadData();
    });
  }

  editCard(card) {}

  changeState() {}

  changeType() {}

  manageTeam() {
    this.windowService.open(ManageTeamComponent, { title: `Manage User`, context: {id: this.id, users: this.project.users} }).onClose.subscribe(res => {
      this.loadData();
    });
  }

  createCard() {}

  createTask(card) {}
  editTask(task) {}

}
