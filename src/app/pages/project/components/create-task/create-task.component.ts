import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbComponentStatus, NbWindowRef } from '@nebular/theme';
import { AppConfig } from 'src/app/config/app.config';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-task.component.html',
//   styleUrls: ['./create-project.component.scss']
})
export class CreateTaskComponent implements OnInit {

  form: FormGroup;
  data: any;

  constructor(
    private proService: ProjectService,
    protected windowRef: NbWindowRef,
    private toastService: NbToastrService,
    public vg: AppConfig,
  private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.data = this.windowRef.config.context;
    this.form = this.fb.group({
        description: ['', Validators.required],
        users: [[], Validators.required],
        endDate: ['', Validators.required],
      
    });
  }

  showToast(position, status: NbComponentStatus, message, titre) {
    this.toastService.show(message, titre, { position, status });
  }

  onCreate() {
      const users = [];
      let user: any = {};
      this.form.value.users.forEach(el => {
          user = this.data.users.find(item => item.email == el);
          users.push({
                id: user.id,
                name: user.firstname + ' ' + user.lastname,
                email: user.email,
                role: user.role
        });
    });
    const data = {
        description: this.form.value.description,
        users,
        endDate: new Date(this.form.value.endDate),
        comment: '-',
        cards: this.data.idCard,
        state: this.vg.state.OPENED
    }
    this.proService.updateAdd(this.data.id, {tasks: data})
    .subscribe(res => {
      this.showToast('top', 'info', res.body.message, this.form.value.name)
      if (res.body.success) {
        this.windowRef.close();
      }
    })
  }

}
