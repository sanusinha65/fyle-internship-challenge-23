import { Component } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fyle-frontend-challenge-23';
  userInput: string = '';
  publicRepoCount: number = 0;

  handleSubmission(userName: string) {
    this.userInput = userName;
  }

  handlePublicRepoCount(count: number): void {
    this.publicRepoCount = count;
  }
}
