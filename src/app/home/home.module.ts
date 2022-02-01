import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ListsCardComponent } from '../components/lists-card/lists-card.component';
import { TaskModalComponent } from '../components/task-modal/task-modal.component';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ListsCardComponent,
    TaskModalComponent,
  ]
})
export class HomePageModule {}
