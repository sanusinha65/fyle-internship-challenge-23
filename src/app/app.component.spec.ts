import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component'; 
import { UserInputComponent } from './user-input/user-input.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './services/api.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RepoListComponent } from './repo-list/repo-list.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, UserInputComponent, UserDetailsComponent, RepoListComponent],
    imports: [HttpClientTestingModule],
    providers: [ApiService],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fyle-frontend-challenge-23'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fyle-frontend-challenge-23');
  });
});
