import { Component, OnInit } from '@angular/core';
import { AllUser } from 'src/app/models/user.model';
import { UserService } from './services/user.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AppConfig } from 'src/app/config/app.config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<img src="assets/img/add.png" width="20" alt="">',
      createButtonContent: '<img src="assets/img/check.png" width="20" alt="">',
      cancelButtonContent: '<img src="assets/img/close.png" width="20" alt="">',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<img src="assets/img/pencil.png" width="20" alt="">',
      saveButtonContent: '<img src="assets/img/check.png" width="20" alt="">',
      cancelButtonContent: '<img src="assets/img/close.png" width="20" alt="">',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<img src="assets/img/trash.png" width="20" alt="">',
      confirmDelete: true,
    },
    actions: {
      delete: true,
      add: true
    },
    hideSubHeader: false,
    noDataMessage: 'No data',
    pager: {display: true, perPage: 10},
    columns: {
      firstname: {
        title: 'Firstname',
        type: 'string',
        editable: false,
      },
      lastname: {
        title: 'Lastname',
        type: 'string',
        editable: true,
      },
      email: {
        title: 'Email',
        type: 'string',
        editable: true,
      },
      role: {
        title: 'Role',
        type: 'array',
        editor: {
          type: 'list',
          config: {
            list: this.vg.roles
          }
        },
        editable: true,
      },
      state: {
        title: 'State',
        type: 'array',
        editor: {
          type: 'list',
          config: {
            list: [
              {value: 'true', title: 'Open'},
              {value: 'false', title: 'Close'},
            ]
          },
        },
        editable: true,
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  users: AllUser;

  constructor(private userService: UserService, public vg: AppConfig) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.userService.getAllUser()
    .subscribe(res => {
      this.users = res.body;
      const data = [];
      this.users.result.forEach(el => {
        data.push({
          firstname: el.firstname,
          lastname: el.lastname,
          email: el.email,
          role: el.role,
          state: el.state
        });
      });
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    const message = 'Are sure you want to delete this users?';
    if (window.confirm(message)) {
      this.userService.deleteUser(this.users.result.find(el => el.email == event.data.email)._id)
      .subscribe(res => {
        this.loadData();
        alert(res.body.message)
      })
    } else {
      event.confirm.reject();
    }
  }

  createConfirm(event): void {
    if (window.confirm('Are you sure you want to continue?')) {
      const data = {
        firstname: event.newData.firstname,
        lastname: event.newData.lastname,
        email: event.newData.email,
        role: event.newData.role,
        state: event.newData.state
      };
      this.userService.AddUser(data)
      .subscribe(res => {
        this.loadData();
      });
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure?')) {
      this.userService.updateUser(this.users.result.find(el => el.email == event.data.email)._id, event.newData)
      .subscribe(res => {
        this.loadData();
        alert(res.body.message)
      })
    }
  }

}
