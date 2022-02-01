import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../interface/Task';

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
    return type === 'in-progress' ? 'In Progress' : 'Todos';
  }
}
