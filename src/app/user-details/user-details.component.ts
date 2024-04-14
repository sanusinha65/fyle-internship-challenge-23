import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})


export class UserDetailsComponent implements OnChanges {
  @Input() userInput: string = '';
  @Input() isLoading: boolean = false; 
  @Output() publicRepoCount: EventEmitter<number> = new EventEmitter<number>();
  userData: any;
  repos: any;
  error: string | null = null;
  constructor(private apiService: ApiService, private elementRef: ElementRef) {}
// fetching the user data from the user input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInput'] && this.userInput) {
      this.isLoading=true;
      this.fetchUserDetails(this.userInput);
    }
  }
// for fetching the details 
  private fetchUserDetails(username: string): void {
    this.userData = null;
    this.repos = null;
    this.error = null;
    this.apiService.getUser(username) 
      .subscribe(userData => {
        this.userData = userData;
        this.publicRepoCount.emit(userData.public_repos);
        
        this.scrollIntoView();
      }, error => {
        this.error = 'Error fetching user details: ' + error.message;
      }, () => {
        this.isLoading = false;
      });
  } 

  private scrollIntoView(): void {
    const element = this.elementRef.nativeElement.querySelector('#gitUserDetailsView');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } 
}
