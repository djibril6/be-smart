import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbComponentStatus, NbWindowRef } from '@nebular/theme';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../../user/services/user.service';
import { AppConfig } from 'src/app/config/app.config';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
//   styleUrls: ['./create-project.component.scss']
})
export class ManageTeamComponent implements OnInit {

  form: FormGroup;
  data: any;

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
      add: false,
      update: false
    },
    // mode: 'external', // a revoir
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
        type: 'string',
        editable: true,
      },
      state: {
        title: 'State',
        type: 'string',
        editable: true,
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private proService: ProjectService,
    protected windowRef: NbWindowRef,
    private toastService: NbToastrService,
    private userService: UserService,
    public vg: AppConfig,
  private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.data = this.windowRef.config.context;
    this.loadAllUser();
    this.form = this.fb.group({
      email: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  loadAllUser() {
    const data = [];
    this.data.users.forEach(item => {
      data.push({
        firstname: item.firstname,
        lastname: item.lastname,
        email: item.email,
        role: item.role,
        state: item.state
      });
    });
    this.source.load(data);
  }

  showToast(position, status: NbComponentStatus, message, titre) {
    this.toastService.show(message, titre, { position, status });
  }

  onAddUsers() {
    this.userService.getOneUserByEmail(this.form.value.email)
    .subscribe(re => {
      const data = {
        id: re.body.result._id,
        firstname: re.body.result.firstname,
        lastname: re.body.result.lastname,
        email: re.body.result.email,
        role: this.form.value.role,
        state: true
      }
      this.proService.updateAdd(this.data.id, {users: data})
      .subscribe(res => {
        this.showToast('top', 'info', res.body.message, this.form.value.name)
        if (res.body.success) {
          this.windowRef.close();
        }
      })
    });
  }

  onDeleteConfirm(event): void {
    const message = 'Are sure you want to delete this users?';
    if (window.confirm(message)) {
      // this.userService.deleteUser(this.data.users.find(el => el.email == event.data.email)._id)
      // .subscribe(res => {
      //   this.showToast('top', 'info', res.body.message, 'User');
      //   this.loadData();
      // })
    } else {
      event.confirm.reject();
    }
  }

}
