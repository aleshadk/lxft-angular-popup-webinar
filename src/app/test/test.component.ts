import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input() title: string;

  constructor(private cdr: ChangeDetectorRef) {
/*     setTimeout(() => {
      this.title = '321';
      this.cdr.detectChanges();
    }, 1000); */
  }

  ngOnInit(): void {
  }

}
