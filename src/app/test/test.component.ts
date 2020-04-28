import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { IClosable } from '../shared/popup/popup.models';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, IClosable<string> {
  @Input() title: string;
  @Output() closed = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {
/*     setTimeout(() => {
      this.title = '321';
      this.cdr.detectChanges();
    }, 1000); */
  }

  ngOnInit(): void {
  }

  public submit(result: string): void {
    console.log(result);
    this.closed.emit(result);
  }

}
