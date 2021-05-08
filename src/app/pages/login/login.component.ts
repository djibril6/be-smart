import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { User } from 'src/app/models/user.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder, 
    public vg: AppConfig, 
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['issoufoudjib@gmail.com', Validators.required],
      pass: ['1234', Validators.required],
    });
  }

  onLogin() {
    this.loginService.login(this.form.value)
    .subscribe(res => {
      if (res.body.success) {
        this.vg.token = res.body.token;
        this.vg.connected = true;
        this.router.navigate(['page/home'])
      }
    });
  }

}
