import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnChanges {
  @Input() userInput: string = ''; // taking user input
  @Input() publicRepoCount: number = 0; // taking total number of repositories
  @Input() currentPage: number = 1; // Initialize currentPage here
  isLoading: boolean = false; // taking loading state for showing the loader
  repositories: any[] = []; // getting repositories
  topics: string[] = []; // getting topics
  totalPages: number = 0; // adding total pages here
  totalPagesArray: number[] = []; // pushing the total page numbers 
  error: string | null = null; 



  constructor(private apiService: ApiService) {}
 // when the users enters the input and submits it
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInput'] && this.userInput) {
      this.currentPage=1;
      this.loadRepositories();
    }
  }
// loading repositories
  loadRepositories(): void {
    this.isLoading = true;
    this.error = null; // Clear previous error

    this.apiService.getRepositories(this.userInput, this.currentPage)
      .pipe(
        catchError(error => {
          this.error = 'Failed to load repositories. Please try again.';
          this.isLoading = false; // Stop loading
          return throwError(error);
        }),
        finalize(() => this.isLoading = false) // Stop loading in all cases
      )
      .subscribe(
        response => {
          this.repositories = response;
          console.log(this.repositories);
          this.setTotalPages(this.publicRepoCount);
        }
      );
  }
 // updating total page numbers
  setTotalPages(publicRepoCount: number): void {
    this.totalPages = Math.ceil(publicRepoCount / 10);
    this.updatePageNumbers();
  }
// changing the page number and calling the load repositories
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadRepositories(); 
    }
  }
// changing the next page numbers
  nextPage(): void {
    if (this.currentPage + 9 <= this.totalPages) {
      this.currentPage += 9;
    } else {
      this.currentPage = this.totalPages;
    }
    this.updatePageNumbers();
    this.loadRepositories(); 
  }
// changing the previous page numbers
  previousPage(): void {
    if (this.currentPage > 9) {
      this.currentPage -= 9;
    } else {
      this.currentPage = 1;
    }
    this.updatePageNumbers();
    this.loadRepositories(); 
  }
// updating the page numbers based on the current page number
  private updatePageNumbers(): void {
    const startingPage = Math.max(1, this.currentPage - 8);
    this.totalPagesArray = Array.from(
      { length: Math.min(9, this.totalPages - startingPage + 1) },
      (_, i) => startingPage + i
    );
  }
}
