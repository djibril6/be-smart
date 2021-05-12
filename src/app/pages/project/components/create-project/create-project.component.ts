import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbWindowRef } from '@nebular/theme';
import { AppConfig } from 'src/app/config/app.config';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  form: FormGroup;

  constructor(
    private proService: ProjectService,
    protected windowRef: NbWindowRef,
    private toastService: NbToastrService,
    private route: Router,
    public vg: AppConfig,
  private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      color: ['#5246E0', Validators.required],
      link: ['', Validators.nullValidator],
    });
  }

  showToast(position, status: NbComponentStatus, message, titre) {
    this.toastService.show(message, titre, { position, status });
  }

  onCreate() {
    const data = this.form.value;
    data.state = this.vg.state.OPENED;
    data.users = [{
      id: this.vg.user._id,
      firstname: this.vg.user.firstname,
      lastname: this.vg.user.lastname,
      email: this.vg.user.email,
      role: this.vg.project_roles.OWNER,
      state: true,
    }];
    this.proService.AddProject(data)
    .subscribe(res => {
      this.showToast('top', 'info', res.body.message, this.form.value.name)
      if (res.body.success) {
        this.route.navigate(['page/project', res.body.result._id]);
        this.windowRef.close();
      }
    })
  }

}
