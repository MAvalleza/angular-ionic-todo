import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';
import { ModalController, IonDatetime, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

const TOOLBAR_COLORS = {
  add: 'primary',
  edit: 'dark',
};

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})

export class TaskModalComponent implements OnInit {
  @Input() mode: string;
  @Input() task?: any;
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  name: string;
  description: string;
  date: any;
  
  formattedDate: string = '';
  constructor(public modalController: ModalController, public toastController: ToastController) { }

  ngOnInit() {
    if (this.task && this.mode === 'edit') {
      this.name = this.task.name || '';
      this.description = this.task.description || '';
      this.date = this.task.date?.toDate();
      this.formattedDate = this.date ? format(this.date, 'MMM dd, yyyy') : '';
    }
  }

  onSubmit () {
    if (!this.name) {
      this.presentToast({
        message: 'Please provide a task name',
        color: 'warning',
      });
      return;
    }
    const data = {
      name: this.name,
      description: this.description || '',
      ...this.mode === 'add' && { status: 'pending' },
      ...this.date && { date: new Date(this.date) },
    };
    this.dismiss(data);
  }
  onDateChange (dateValue) {
    this.formattedDate = this.formatDate(dateValue);
    this.date = dateValue;
  }
  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd, yyyy');
  }
  dismiss (task) {
    if (task) {
      this.modalController.dismiss({
        mode: this.mode,
        ...this.mode === 'edit' && { updateId: this.task.id },
        taskData: task,
      });
    }
    this.modalController.dismiss();
  }
  async presentToast ({ message, color }) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }
  getToolbarColor (mode) {
    return TOOLBAR_COLORS[mode];
  }
}
