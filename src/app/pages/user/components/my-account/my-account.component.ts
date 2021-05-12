import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NbToastrService, NbComponentStatus, NbWindowRef } from '@nebular/theme';
import { AppConfig } from '../../../../config/app.config';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
//   styleUrls: ['./user.component.scss']
})
export class MyAccountComponent implements OnInit {

    form: FormGroup;
    data: any;
    goodPass = true;

  constructor(
      private userService: UserService, 
      protected windowRef: NbWindowRef,
      private toastService: NbToastrService,
      public vg: AppConfig,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
        firstname: [this.vg.user?.firstname, Validators.required],
        lastname: [this.vg.user?.lastname, Validators.required],
        email: [this.vg.user?.email, Validators.required],
        role: [this.vg.user?.role, Validators.required],
        pass: ['', Validators.nullValidator],
    });
  }

  showToast(position, status: NbComponentStatus, message, titre) {
    this.toastService.show(message, titre, { position, status });
  }

  checkPassword(pass) { 
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if(pass.match(passw)) { 
      return true;
    }
    else { 
      return false;
    }
  }

  updateUser() {
    const data: any = {};
    if (this.form.value.pass) { 
      data.pass = this.form.value.pass;
      this.goodPass = this.checkPassword(this.form.value.pass)
    }
    if (!this.goodPass) {
      return;
    }
    this.goodPass = true;
    data.firstname = this.form.value.firstname;
    data.lastname = this.form.value.lastname;
    data.email = this.form.value.email;
    // data.role = this.form.value.role;
    this.userService.updateAccount(this.vg.user._id, data)
    .subscribe(res => {
      this.vg.user.firstname = this.form.value.firstname;
      this.vg.user.lastname = this.form.value.lastname;
      this.vg.user.email = this.form.value.email;
      this.showToast('top', 'info', res.body.message, 'User');
      if (res.body.success) {
        this.windowRef.close();
      }
    });
  }

}
