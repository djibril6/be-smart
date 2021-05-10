import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { NbWindowService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateProjectComponent } from './project/components/create-project/create-project.component';
import { ProjectService } from './project/services/project.service';
import { ProjectData } from '../models/project.model';
import { MyAccountComponent } from './user/components/my-account/my-account.component';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

    searchForm: FormGroup;
    groups: ProjectData[];
    loading = false;

    constructor(
        private windowService: NbWindowService, 
        private toastrService: NbToastrService, 
        private proService: ProjectService,
        private fb: FormBuilder,
        private router: Router,
        public vg: AppConfig, 
    ) {}

    ngOnInit() {
        this.searchForm = this.fb.group({
            searchValue: ['', Validators.required],
        });

        this.searchForm.valueChanges.subscribe(item => {
          this.onSearch(item.searchValue)
        });
    }

    showToast(position, status: NbComponentStatus, message, titre) {
        this.toastrService.show(message, titre, { position, status });
    }

    newProject() {
        this.windowService.open(CreateProjectComponent, { title: `New Project` });
    }

    showUsers() {
        this.router.navigate(['page/users']);
    }

    onShowCompte() {
      this.windowService.open(MyAccountComponent, { title: `My Acount` });
    }

    goToProject(project: ProjectData) {
      const my_role = project.users?.find(item => item.id == this.vg.user._id);
      if (!my_role && project.type ==  this.vg.type.PRIVATE) {
        this.showToast('top', 'danger', 'This project is private. You can\'t acces to it until you are added', 'Project')
        return;
      }
      this.router.navigate(['page/project', project._id])
    }

    onSearch(value: string) {
        if (value) {
          this.proService.getProjectWithKey(value)
          .subscribe(res => {
            if (res.body.success) {
              this.groups = res.body.result;
            }
          });
        }
    }
    logout() {
      this.vg.connected = false;
      this.vg.user = {};
      this.router.navigate(['login'])
    }
    
}
