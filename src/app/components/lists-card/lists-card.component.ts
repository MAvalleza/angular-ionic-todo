import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../interface/Task';

@Component({
  selector: 'app-lists-card',
  templateUrl: './lists-card.component.html',
  styleUrls: ['./lists-card.component.scss'],
})
export class ListsCardComponent implements OnInit {
  @Input () taskItems: Task[];
  @Input () title: string;
  @Input () color: string;
  constructor() { }

  ngOnInit() {}

}
