import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { NbWindowService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateProjectComponent } from './project/components/create-project/create-project.component';
import { ProjectService } from './project/services/project.service';
import { ProjectData } from '../models/project.model';


export interface Group {
    name: string;
    type: string;
  }

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

    searchForm: FormGroup;
    groups: Group[];
    loading = false;
    projects: ProjectData[];

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
        // this.windowService.open(UpdateCompteComponent, { title: `Mon compte` });
    }

    onSubmit() {
        this.loading = true;
        this.proService.getProjectWithKey(this.searchForm.value.searchValue)
          .subscribe(res => {
              this.loading = false;
            this.showToast('top', 'danger', 'No results',   'Search');
            if (res.body.success) {
              this.projects = res.body.result;
            }
        });
    }

    onSearch(value: string) {
        this.groups = [{
          name: '',
          type: ''
        }];
        if (value) {
          this.proService.getProjectWithKey(value)
          .subscribe(res => {
            if (res.body.success) {
              res.body.result.forEach(p => {
                this.groups.push({
                  name: p.name,
                  type: p.type,
                });
              });
            }
            this.groups.shift();
          });
        }
    }
    
}
