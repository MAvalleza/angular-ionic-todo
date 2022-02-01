import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  getToolbarColor (mode) {
    console.log('mode', mode);
    return TOOLBAR_COLORS[mode];
  }
  dismiss () {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
