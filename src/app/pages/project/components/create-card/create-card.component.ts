import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbComponentStatus, NbWindowRef } from '@nebular/theme';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
//   styleUrls: ['./create-project.component.scss']
})
export class CreateCardComponent implements OnInit {

  form: FormGroup;
  data: any;

  constructor(
    private proService: ProjectService,
    protected windowRef: NbWindowRef,
    private toastService: NbToastrService,
  private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.data = this.windowRef.config.context;
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  showToast(position, status: NbComponentStatus, message, titre) {
    this.toastService.show(message, titre, { position, status });
  }

  onCreate() {
    this.proService.updateAdd(this.data.id, {cards: this.form.value})
    .subscribe(res => {
      this.showToast('top', 'info', res.body.message, this.form.value.name)
      if (res.body.success) {
        this.windowRef.close();
      }
    })
  }

}
