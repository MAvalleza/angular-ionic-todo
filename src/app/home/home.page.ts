import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from '../components/task-modal/task-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public modalController: ModalController) {}

  /**
   * 
   * @param mode - 'add' | 'edit'
   */
  async openTaskModal (mode: String) {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: {
        mode,
      },
      backdropDismiss: false,
      swipeToClose: false,
    });
    return await modal.present();
  }
}
