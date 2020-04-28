import { Component } from '@angular/core';
import { PopupService } from './shared/popup/popup.service';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lxft-angular-popup';

  constructor(private popupService: PopupService) {
    this.show();
  }

  private show(): void {
    const child = this.popupService.create(TestComponent);
    child.instance.title = '123';
    this.popupService.show('hello from service!', child);
  }
}
