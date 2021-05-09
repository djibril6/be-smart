import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { ProjectData } from 'src/app/models/project.model';
import { ProjectService } from './services/project.service';
import { NbSidebarService, NbWindowService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { ManageTeamComponent } from './components/manage-team/manage-team.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  id: string;
  project: ProjectData;
  cards: {
    _id?: string,
    name?: string,
    tasks?: {
      _id?: string,
      description?: string,
      users?: {
        id: string,
        name: string,
        email: string,
        role: string
      }[],
      endDate?: Date,
      comment?: string,
      cards?: string
    }[]
  }[];
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
    private proService: ProjectService,
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
        this.cards = this.project.cards;
        if (this.cards) {
          this.project.tasks.forEach(item => {
            const idx = this.cards.findIndex(el => el._id == item.cards);
            if (this.cards[idx]?.tasks) {
              this.cards[idx].tasks.push(item);
            } else {
              this.cards[idx].tasks = [item];
            }
          });
        }
      });
  }

  onCreateCard() {
    this.windowService.open(CreateCardComponent, { title: `Add new Card`, context: { id: this.id, user: {} } }).onClose.subscribe(res => {
      this.loadData();
    });
  }

  changeState() { }

  changeType() { }

  manageTeam() {
    this.windowService.open(ManageTeamComponent, { title: `Manage User`, context: { id: this.id, users: this.project.users } }).onClose.subscribe(res => {
      this.loadData();
    });
  }

  createCard() { }

  createTask(card) {
    this.windowService.open(CreateTaskComponent, { title: `Add new Task`, context: { id: this.id, users: this.project.users, idCard: card._id } }).onClose.subscribe(res => {
      this.loadData();
    });
  }
  editTask(task) { }

}

// Card Title Component
@Component({
  selector: 'card-title',
  template: `
    <input nbInput type="text" [value]="card.name" [formControl]="name">
    <button 
    *ngIf="current_user.role == vg.project_roles.OWNER"
    nbButton (click)="editCard()" outline size="small"  nbTooltip="Edit">
        <nb-icon icon="edit-2-outline" [options]="{ animation: { type: 'zoom' } }"></nb-icon>
    </button>
  `,
})
export class CardTitle implements OnInit {

  @Input() card: {
    _id: string,
    name: string,
    tasks: []
  }
  @Input() current_user: any;
  @Input() idProject: string;
  name = new FormControl();
  editMode = false;
  constructor(
    private proService: ProjectService,
    public vg: AppConfig
  ) {

  }

  ngOnInit() {
    this.name.setValue(this.card?.name);
  }

  editCard() {
    const data = {
      old: {
        _id: this.card._id,
        name: this.card.name,
      },
      new: {
        _id: this.card._id,
        name: this.name.value,
      }
    }
    this.proService.updateCards(this.idProject, data)
      .subscribe(res => { });
  }
}

// Single Task component
@Component({
  selector: 'single-task',
  template: `
    <nb-card>
      <nb-card-body style="word-wrap: break-word;">
        <div *ngIf="!editMode">
          <nb-user *ngFor="let user of task.users" size="tiny" [nbTooltip]="user.role+' '+user?.name" [showTitle]="false" shape="round" [name]="user?.name" onlyPicture></nb-user>
        </div>
          <textarea nbInput [readonly]="!editMode" fullWidth [formControl]="description">
            {{ task.description }}
          </textarea> <br>
          <input *ngIf="task.endDate" nbInput size="tiny" fullWidth [nbDatepicker]="datepicker" [value]="task.endDate" [formControl]="endDate" [readonly]="!editMode">
          <nb-datepicker #datepicker></nb-datepicker><br>
          <nb-select *ngIf="editMode" multiple placeholder="Users assigned to this task" [formControl]="users">
            <nb-option *ngFor="let el of task?.users" [value]="el.email">{{el.name}}</nb-option>
          </nb-select>
        <button 
          *ngIf="current_user.role == vg.project_roles.OWNER"
          (click)="editTask()"
          nbButton outline size="tiny"  [nbTooltip]="editMode? 'Confirm?':'Edit'">
              <nb-icon [icon]="editMode? 'checkmark-outline':'edit-2-outline'" [options]="{ animation: { type: 'zoom' } }"></nb-icon>
        </button>
      </nb-card-body>
    </nb-card>
  `,
})
export class SingleTask implements OnInit {

  @Input() task: {
    _id?: string,
    description?: string,
    users?: {
      id: string,
      name: string,
      email: string,
      role: string
    }[],
    endDate?: Date,
    comment?: string,
    cards?: string
  }
  @Input() current_user: any;
  @Input() all_users: any[];
  @Input() idProject: string;
  description = new FormControl();
  endDate = new FormControl();
  users = new FormControl();
  editMode = false;
  constructor(
    private proService: ProjectService,
    public vg: AppConfig
  ) {

  }

  ngOnInit() {
    this.description.setValue(this.task?.description);
    this.endDate.setValue(this.task?.endDate);
    const emails = [];
    this.task?.users.forEach(el => {
      emails.push(el.email);
    });
    this.users.setValue(emails);
  }

  editTask() {
    if (this.editMode) {
      const users = [];
      let user: any = {};
      this.users.value.forEach(el => {
          user = this.all_users.find(item => item.email == el);
          users.push({
                id: user.id,
                name: user.firstname + ' ' + user.lastname,
                email: user.email,
                role: user.role
        });
    });
      const data = {
        old: this.task,
        new: {
          _id: this.task._id,
          description: this.description.value,
          users,
          endDate: this.endDate.value,
          comment: this.task.comment,
          cards: this.task.cards
        }
      }
      this.proService.updateTasks(this.idProject, data)
        .subscribe(res => { });
    }
    this.editMode = !this.editMode;
  }
}