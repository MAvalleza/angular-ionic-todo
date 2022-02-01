import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from  '@angular/fire/compat/firestore';
import { TaskModalComponent } from '../components/task-modal/task-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: any[];
  pendingTasks: Object[];
  ongoingTasks: Object[];
  finishedTasks: Object[];
  loading: any;
  constructor(public modalController: ModalController, private store: AngularFirestore,
    public loadingController: LoadingController,
    public toastController: ToastController) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks () {
    this.presentLoading();
    this.store.collection('todos').snapshotChanges().subscribe((res) => {
      this.todos = res.map(item => Object.assign({ id: item.payload.doc.id }, item.payload.doc.data()));
      this.filterTasks();
    });
  }

  filterTasks () {
    this.pendingTasks = this.todos.filter(todo => todo.status === 'pending');
    this.ongoingTasks = this.todos.filter(todo => todo.status === 'ongoing');
    this.finishedTasks = this.todos.filter(todo => todo.status === 'finished');
    this.dismissLoading();
  }

  async createTask (task) {
    try {
      this.presentLoading();
      await this.store.collection('todos').add(task);
      this.presentToast({
        message: 'Task added successfully!',
        color: 'success',
      });
    } catch (e) {
      console.error(e);
      this.presentToast({
        message: 'There was an error in adding.',
        color: 'danger',
      });
    } finally {
      this.dismissLoading();
    }
  }

  async deleteTask (taskId) {
    try {
      this.presentLoading();
      await this.store.collection('todos').doc(taskId).delete();
      this.presentToast({
        message: 'Task deleted successfully!',
        color: 'success',
      });
    } catch (e) {
      console.error(e);
      this.presentToast({
        message: 'There was an error in deleting.',
        color: 'danger',
      });
    } finally {
      this.dismissLoading();
    }
  }

  editTask (task) {
    this.openTaskModal('edit', task);
  }

  updateStatus (payload) {
    const { updateId, status } = payload;
    this.updateTask(updateId, { status });
  }

  async updateTask (taskId, taskData) {
    try {
      this.presentLoading();
      await this.store.collection('todos').doc(taskId).update(taskData);
      this.presentToast({
        message: 'Task updated!',
        color: 'success',
      });
    } catch (e) {
      console.error(e);
      this.presentToast({
        message: 'Could not update task',
        color: 'danger',
      });
    } finally {
      this.dismissLoading();
    }
  }

  /**
   * 
   * @param mode - 'add' | 'edit'
   */
  async openTaskModal (mode: String, task: Object) {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: {
        mode,
        ...task && { task },
      },
      backdropDismiss: false,
      swipeToClose: false,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.mode === 'add') {
      this.createTask(data.taskData);
    } else if (data?.mode === 'edit' && data?.updateId) {
      this.updateTask(data.updateId, data.taskData);
    }
  }

  async presentLoading () {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await this.loading.present();
  }

  async dismissLoading () {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  async presentToast ({ message, color }) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }
}
