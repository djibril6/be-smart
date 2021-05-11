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
    private toastService: NbToastrService,
    public vg: AppConfig
  ) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.loadData();
  }
  showToast(position, status: NbComponentStatus, message, titre) {
    this.toastService.show(message, titre, { position, status });
  }

  loadData() {
    this.proService.getOneProject(this.id)
      .subscribe(res => {
        this.project = res.body.result;
        this.current_user = this.project.users?.find(item => item.id == this.vg.user._id);
        if (!this.current_user) {
          this.current_user = {
            id: this.vg.user._id,
            firstname: this.vg.user.firstname,
            lastname: this.vg.user.lastname,
            role: this.vg.project_roles.VIEWER,
            email: this.vg.user.email,
            state: this.vg.user.state
          }
        }
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
    this.windowService.open(CreateCardComponent, { title: `Add new Group`, context: { id: this.id, user: {} } }).onClose.subscribe(res => {
      this.loadData();
    });
  }

  changeState() {
    const state = this.project.state == this.vg.state.OPENED? this.vg.state.CLOSED:this.vg.state.OPENED
    this.proService.updateProject(this.project._id, {state})
    .subscribe(res => {
      if (res.body.success) {
        this.project.state = state;
      }
      this.showToast('top', 'info', res.body.message, 'To '+state);
    });
  }

  changeType() {
    const type = this.project.type == this.vg.type.PRIVATE? this.vg.type.PUBLIC:this.vg.type.PRIVATE
    this.proService.updateProject(this.project._id, {type})
    .subscribe(res => {
      if (res.body.success) {
        this.project.type = type;
      }
      this.showToast('top', 'info', res.body.message, 'To '+type);
    });
  }

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
    <input 
      nbInput
      (click)="onEditCard()"
      [readonly]="!editMode"
      style="border: none; background: rgba(0, 0, 0, 0);"
      type="text" 
      [value]="card.name" 
      [formControl]="name">
    <button 
    *ngIf="current_user.role == vg.project_roles.OWNER && editMode"
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

  onEditCard() {
    this.editMode = true;
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
      .subscribe(res => { 
        this.editMode = false;
      });
  }
}

// Single Task component
@Component({
  selector: 'single-task',
  template: `
    <div [style]="(task.state == vg.state.CLOSED? 'background: rgb(77, 11, 11);':'background: #252547;') + 
    'border: 1px solid black; box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.76); border-radius: 3px 3px; padding: 2px 5px 5px 5px; margin-top: 10px;'">
      <div>

        <textarea 
          (click)="onEditTask()" 
          nbInput 
          [readonly]="!editMode" 
          fullWidth 
          [formControl]="description" 
          style="border: none; background: rgba(0, 0, 0, 0);">
            {{ task.description }}
        </textarea> <br>

        <input 
          *ngIf="editMode && task.endDate" 
          (click)="onEditTask()" 
          style="border: none; background: rgba(0, 0, 0, 0); font-size: 10px; height: 30px;" 
          nbInput size="tiny" 
          fullWidth 
          [nbDatepicker]="datepicker" 
          [value]="task.endDate" 
          [formControl]="endDate" 
          [readonly]="!editMode">
        <nb-datepicker #datepicker></nb-datepicker><br>

        <nb-select 
          *ngIf="editMode" 
          style="border: none; background: rgba(0, 0, 0, 0); font-size: 13px; height: 30px;" 
          multiple 
          placeholder="Users assigned to this task" 
          [formControl]="users">
            <nb-option *ngFor="let el of task?.users" [value]="el.email">{{el.name}}</nb-option>
        </nb-select>

        <span *ngIf="task.state == vg.state.CLOSED && !editMode">{{ task.state }}</span>

        <button 
          *ngIf="current_user.role == vg.project_roles.OWNER && task.state != vg.state.CLOSED && editMode"
          (click)="editTask()"
          nbButton 
          outline 
          size="tiny"  
          [nbTooltip]="editMode? 'Confirm?':'Edit'">
              <nb-icon [icon]="editMode? 'checkmark-outline':'edit-2-outline'" [options]="{ animation: { type: 'zoom' } }"></nb-icon>
        </button>

        <button
          *ngIf="(current_user.role == vg.project_roles.OWNER || current_user.role == vg.project_roles.DEV) && !editMode"
          (click)="changeState()"
          nbButton 
          outline 
          size="tiny"  
          [nbTooltip]="task.state == vg.state.CLOSED? 'Set as non finished':'Set as finished'">
              <nb-icon [icon]="task.state == vg.state.CLOSED? 'lock-outline':'unlock-outline'" [options]="{ animation: { type: 'zoom' } }"></nb-icon>
        </button>

        <div 
          *ngIf="!editMode"
          style="width: 100%;
                   height: 30px;
                   overflow-x: auto;
                   overflow-y: hidden;
                   white-space: nowrap;
                   margin-top: 5px;">
          <nb-user 
            *ngFor="let user of task.users" 
            style="width: 11%;
                  display: inline-block;"
            size="tiny" 
            [nbTooltip]="user.role+' '+user?.name" 
            [showTitle]="false" 
            shape="round" 
            [name]="user?.name" 
            onlyPicture>
          </nb-user>
        </div>
      </div>
    </div>
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
    cards?: string,
    state?: string
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

  changeState() {
    const data = {
      old: this.task,
      new: this.task
    }
    if (this.task.state == this.vg.state.CLOSED) {
      data.new.state = this.vg.state.OPENED;
    } else {
      data.new.state = this.vg.state.CLOSED;
    }
    this.proService.updateTasks(this.idProject, data)
        .subscribe(res => {});
  }

  onEditTask() {
    if (this.task.state == this.vg.state.OPENED) {
      this.editMode = true;
    }
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
          cards: this.task.cards,
          state: this.task.state
        }
      }
      this.proService.updateTasks(this.idProject, data)
        .subscribe(res => { 
          this.editMode = false;
        });
    }
    // this.editMode = !this.editMode;
  }
}