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
  @Input() currentPage: number = 1;
  perPage: number = 10;
  isLoading: boolean = false;
  repositories: any[] = [];
  topics: string[] = [];
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInput'] && this.userInput) {
      this.currentPage = 1;
      this.loadRepositories();
    }
  }

  loadRepositories(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getRepositories(this.userInput, this.currentPage, this.perPage)
      .pipe(
        catchError(error => {
          this.error = 'Failed to load repositories. Please try again.';
          return throwError(error);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        response => {
          this.repositories = response;
          this.totalPages = Math.ceil(this.publicRepoCount / this.perPage);
          this.updatePageNumbers();
        }
      );
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadRepositories();
    }
  }

  nextPage(): void {
    this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
    this.loadRepositories();
  }

  previousPage(): void {
    this.currentPage = Math.max(this.currentPage - 1, 1);
    this.loadRepositories();
  }

  updatePageNumbers(): void {
    this.totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }

  onPerPageChange(): void {
    this.currentPage = 1;
    this.loadRepositories();
  }
}