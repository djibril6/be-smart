import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NbToastrService, NbComponentStatus, NbWindowRef } from '@nebular/theme';
import { AppConfig } from 'src/app/config/app.config';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
//   styleUrls: ['./user.component.scss']
})
export class AddUserComponent implements OnInit {

    form: FormGroup;
    data: any;

  constructor(
      private userService: UserService, 
      protected windowRef: NbWindowRef,
      private toastService: NbToastrService,
      public vg: AppConfig,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.data = this.windowRef.config.context;
    this.form = this.fb.group({
        firstname: [this.data.user?.firstname, Validators.required],
        lastname: [this.data.user?.lastname, Validators.required],
        email: [this.data.user?.email, Validators.required],
        role: [this.data.user?.role, Validators.required],
        state: [this.data.user?.state == 'true', Validators.required],
    });
  }

  showToast(position, status: NbComponentStatus, message, titre) {
    this.toastService.show(message, titre, { position, status });
  }

  action() {
    if (this.data.add) {
        this.addUser();
    } else {
        this.updateUser();
    }
  }

  addUser() {
    this.userService.AddUser(this.form.value)
    .subscribe(res => {
        this.showToast('top', 'info', res.body.message, 'User');
        this.windowRef.close();
    }, error => {
      this.showToast('top', 'danger', 'User already exist!', 'User');
    });
  }

  updateUser() {
    this.userService.updateUser(this.data.user._id, this.form.value)
    .subscribe(res => {
        this.showToast('top', 'info', res.body.message, 'User');
        this.windowRef.close();
    });
  }

}