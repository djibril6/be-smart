import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PageRoutingModule } from './page-routing.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    // PageRoutingModule
  ]
})
export class HomeModule { }
