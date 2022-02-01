import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';
import { ModalController, IonDatetime } from '@ionic/angular';
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
  @Input() mode: String;
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateValue = '';
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  getToolbarColor (mode) {
    return TOOLBAR_COLORS[mode];
  }
  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd, yyyy');
  }
  dismiss () {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
