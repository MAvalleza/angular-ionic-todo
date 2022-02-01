import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from  '@angular/fire/compat/firestore';
import { TaskModalComponent } from '../components/task-modal/task-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: any;
  pendingTasks: Object[];
  ongoingTasks: Object[];
  finishedTasks: Object[];
  constructor(public modalController: ModalController, private store: AngularFirestore) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks () {
    this.store.collection('todos').snapshotChanges().subscribe((res) => {
      this.todos = res.map(item => Object.assign({ id: item.payload.doc.id }, item.payload.doc.data()));
      console.log('todos', this.todos);
    });
  }

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
