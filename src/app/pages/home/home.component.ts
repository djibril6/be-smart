import { Component, OnInit } from '@angular/core';
import { ProjectData } from 'src/app/models/project.model';
import { ProjectService } from '../project/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects: ProjectData[];

  constructor(private proService: ProjectService) { }

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject() {
    this.proService.getAllProject()
    .subscribe(res => {
        if (res.body.success) {
            this.projects = res.body.result;
            console.log(this.projects)
        }
    });
}

}
