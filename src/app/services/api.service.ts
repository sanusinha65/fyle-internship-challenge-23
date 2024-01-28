import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { Observable } from 'rxjs';

interface GitHubRepository {
  id: number;
  name: string;
  topics: string[];
}

interface GitHubUser {
  public_repos: number;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  currentPage: number = 1;
  constructor(
    private httpClient: HttpClient
  ) { }
// getting users page
  getUser(githubUsername: string): Observable<GitHubUser> {
    const url = `https://api.github.com/users/${githubUsername}`;
    return this.httpClient.get<GitHubUser>(url);
  }
  // getting the repositories
  getRepositories(githubUsername: string, pageNumber: number = 1, perPage: number = 10): Observable<GitHubRepository[]> {
    const url = `https://api.github.com/users/${githubUsername}/repos?page=${pageNumber}&per_page=${perPage}`;
    return this.httpClient.get<GitHubRepository[]>(url);
  }
}
