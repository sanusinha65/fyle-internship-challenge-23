import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  userName = '';
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}
  
  @Output() submitNameEvent = new EventEmitter<string>();
  @Output() isLoadingEvent = new EventEmitter<boolean>();

  submitName() {
    this.isLoadingEvent.emit(this.isLoading);
    this.submitNameEvent.emit(this.userName); 
    this.apiService.currentPage = 1;
  }
}
