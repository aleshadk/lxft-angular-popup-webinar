import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() title: string;
  @Output() closed = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public close(): void {
    this.closed.emit();
  }

}
