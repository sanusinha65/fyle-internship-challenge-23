import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInput'] && this.userInput) {
      this.isLoading=true;
      this.fetchUserDetails(this.userInput);
    }
  }

  private fetchUserDetails(username: string): void {
    this.userData = null;
    this.repos = null;
    this.error = null;
    this.apiService.getUser(username)
      .pipe(
        catchError(error => {
          this.error = 'Error fetching user details: ' + error.message;
          return throwError(error);
        }),
        finalize(() => this.isLoading = false) 
      )
      .subscribe(userData => {
        this.userData = userData;
        this.publicRepoCount.emit(userData.public_repos);
      });
  } 
}
