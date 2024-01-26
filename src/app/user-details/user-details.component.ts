import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnChanges {
  @Input() userInput: string = '';

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInput'] && this.userInput) {
      this.fetchUserDetails(this.userInput);
    }
  }

  private fetchUserDetails(username: string): void {
    this.apiService.getUser(username)
      .subscribe((userData) => {
        console.log(userData);
      });
  }
}
