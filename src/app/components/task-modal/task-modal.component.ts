import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';
import { ModalController, IonDatetime } from '@ionic/angular';
import { AngularFirestore } from  '@angular/fire/compat/firestore';
import { format, parseISO } from 'date-fns';

const TOOLBAR_COLORS = {
  add: 'primary',
  update: 'dark',
};

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})

export class TaskModalComponent implements OnInit {
  @Input() mode: string;
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  name: string;
  description: string;
  date: any;
  
  formattedDate: string = '';
  constructor(public modalController: ModalController, private store: AngularFirestore) { }

  ngOnInit() {}

  onSubmit () {
    const data = {
      name: this.name,
      description: this.description,
      ...this.mode === 'add' && { status: 'pending' },
      date: new Date(this.date),
    };
    console.log('submit data', data);
    this.createTask(data);
  }
  async createTask (task) {
    try {
      await this.store.collection('todos').add(task);
      this.dismiss();
    } catch (e) {
      console.error(e);
    }
  }
  onDateChange (dateValue) {
    this.formattedDate = this.formatDate(dateValue);
    this.date = dateValue;
  }
  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd, yyyy');
  }
  async dismiss () {
    await this.modalController.dismiss({
      'dismissed': true
    });
  }
  getToolbarColor (mode) {
    return TOOLBAR_COLORS[mode];
  }
}
