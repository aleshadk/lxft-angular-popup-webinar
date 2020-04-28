import { Component } from '@angular/core';
import { PopupService } from './shared/popup/popup.service';

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
    this.popupService.show('hello from service!');
  }
}
