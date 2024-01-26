import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  userName = '';
  @Output() submitNameEvent = new EventEmitter<string>();

  submitName() {
    this.submitNameEvent.emit(this.userName);
  }
}
