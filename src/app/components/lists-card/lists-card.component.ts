import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../interface/Task';

const TITLE_MAPPINGS = {
  'in-progress': 'In Progress',
  todos: 'Todos',
  done: 'Finished',
};
@Component({
  selector: 'app-lists-card',
  templateUrl: './lists-card.component.html',
  styleUrls: ['./lists-card.component.scss'],
})
export class ListsCardComponent implements OnInit {
  @Input () taskItems: Task[];
  @Input () type: string;
  @Input () color: string;
  constructor() { }

  ngOnInit() {}

  getTitle (type) {
    return TITLE_MAPPINGS[type];
  }
}
