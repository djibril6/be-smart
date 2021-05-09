import { Component, OnInit } from '@angular/core';
import { AllUser } from 'src/app/models/user.model';
import { UserService } from './services/user.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AppConfig } from 'src/app/config/app.config';
import { NbToastrService, NbComponentStatus, NbWindowService, NbDialogService } from '@nebular/theme';
import { AddUserComponent } from './components/add-user.component';

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
      inputClass: 'editClass'
    },
    delete: {
      deleteButtonContent: '<img src="assets/img/trash.png" width="20" alt="">',
      confirmDelete: true,
    },
    actions: {
      delete: true,
      add: true
    },
    mode: 'external', // a revoir
    hideSubHeader: false,
    noDataMessage: 'No data',
    pager: {display: true, perPage: 10},
    columns: {
      firstname: {
        title: 'Firstname',
        type: 'html',
        editable: true,
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

  constructor(
    private userService: UserService, 
    private toastrService: NbToastrService, 
    private windowService: NbWindowService, 
    public vg: AppConfig) { }

  ngOnInit(): void {
    this.loadData()
  }

  showToast(position, status: NbComponentStatus, message, titre) {
    this.toastrService.show(message, titre, { position, status });
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
        this.showToast('top', 'info', res.body.message, 'User');
        this.loadData();
      })
    } else {
      event.confirm.reject();
    }
  }

  createConfirm(): void {
    this.windowService.open(AddUserComponent, { title: `Create User`, context: {add: true, user: {}} }).onClose.subscribe(res => {
      this.loadData();
    });
  }

  onEditConfirm(event): void {
    this.windowService.open(AddUserComponent, { title: `Update User`, 
      context: { add: false, user: this.users.result.find(el => el.email == event.data.email) } 
    }).onClose.subscribe(res => {
      this.loadData();
    });
  }

}
