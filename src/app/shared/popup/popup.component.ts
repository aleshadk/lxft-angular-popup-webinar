import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IClosable } from './popup.models';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, IClosable<null> {
  @Input() title: string;
  @Output() closed = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  public close(): void {
    this.closed.emit(null);
  }

}
