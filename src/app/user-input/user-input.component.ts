import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  userName = '';
  previousName = localStorage.getItem('previousName') ?? '';
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}
  @Output() submitNameEvent = new EventEmitter<string>();
  @Output() isLoadingEvent = new EventEmitter<boolean>(); 

  submitName() {
    this.previousName = localStorage.getItem('previousName') ?? '';
    this.isLoadingEvent.emit(this.isLoading); // pass the loading state to the other components
    localStorage.setItem('previousName', this.userName);
    // passing the name to the other components
    this.submitNameEvent.emit(this.userName);  
    this.apiService.currentPage = 1; //passing the current page to the other components to fetch the first page data on each user submit
  }
  searchPreviousName(){
    let lastSearchedName= this.previousName; 
    this.userName = lastSearchedName;
    this.submitName();
  }
}
