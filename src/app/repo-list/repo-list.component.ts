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
  @Input() userInput: string = '';
  @Input() publicRepoCount: number = 0;
  @Input() currentPage: number = 1; // Initialize currentPage here
  isLoading: boolean = false; 
  repositories: any[] = [];
  topics: string[] = [];
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInput'] && this.userInput) {
      this.currentPage=1;
      this.loadRepositories();
    }
  }

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
          this.setTotalPages(this.publicRepoCount);
        }
      );
  }

  setTotalPages(publicRepoCount: number): void {
    this.totalPages = Math.ceil(publicRepoCount / 10);
    this.updatePageNumbers();
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadRepositories(); 
    }
  }

  nextPage(): void {
    if (this.currentPage + 9 <= this.totalPages) {
      this.currentPage += 9;
    } else {
      this.currentPage = this.totalPages;
    }
    this.updatePageNumbers();
    this.loadRepositories(); 
  }

  previousPage(): void {
    if (this.currentPage > 9) {
      this.currentPage -= 9;
    } else {
      this.currentPage = 1;
    }
    this.updatePageNumbers();
    this.loadRepositories(); 
  }

  private updatePageNumbers(): void {
    const startingPage = Math.max(1, this.currentPage - 8);
    this.totalPagesArray = Array.from(
      { length: Math.min(9, this.totalPages - startingPage + 1) },
      (_, i) => startingPage + i
    );
  }
}
