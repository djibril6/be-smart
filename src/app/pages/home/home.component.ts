import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { ProjectData } from 'src/app/models/project.model';
import { ProjectService } from '../project/services/project.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects: ProjectData[];

  constructor(
    private proService: ProjectService,
    private router: Router,
    private toastService: NbToastrService,
    public vg: AppConfig
    ) { }

  ngOnInit(): void {
    this.loadProject();
  }

  showToast(position, status: NbComponentStatus, message, titre) {
    this.toastService.show(message, titre, { position, status });
  }

  loadProject() {
    this.proService.getAllProject()
    .subscribe(res => {
        if (res.body.success) {
            this.projects = res.body.result;
        }
    });
  }
  openProject(project: ProjectData) {
    const my_role = project.users?.find(item => item.id == this.vg.user._id);
    if (!my_role && project.type == 'private') {
      this.showToast('top', 'danger', 'This project is private. You can\'t acces to it until you are added', 'Project')
      return;
    }
    this.router.navigate(['page/project', project._id])
  }

}
