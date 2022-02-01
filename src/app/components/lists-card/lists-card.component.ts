import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { format } from 'date-fns';

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
  @Input () taskItems: any[];
  @Input () type: string;
  @Input () color: string;
  @Output () onDelete: EventEmitter<String> = new EventEmitter();
  @Output () onEdit: EventEmitter<any> = new EventEmitter();
  @Output () onUpdateStatus: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  onDeleteTask (taskId) {
    this.onDelete.emit(taskId);
  }
  onEditTask (task) {
    this.onEdit.emit(task);
  }
  onStatusChange (taskId, status) {
    this.onUpdateStatus.emit({
      updateId: taskId,
      status,
    });
  }
  getTitle (type) {
    return TITLE_MAPPINGS[type];
  }

  formatDate (date) {
    const parsedDate = date.toDate(); // built in firebase timestamp function
    return format(parsedDate, 'MMM dd, yyyy');
  }
}
