import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [PageComponent, HomeComponent],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PagesModule { }
