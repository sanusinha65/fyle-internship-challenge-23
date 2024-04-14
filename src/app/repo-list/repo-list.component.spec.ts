import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoListComponent } from './repo-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RepoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to previous page when previousPage() is called', () => {
    component.currentPage = 2;
    const initialPage = component.currentPage;
    component.previousPage();
    expect(component.currentPage).toEqual(initialPage - 1);
  });

  it('should go to next page when nextPage() is called', () => {
    component.currentPage = 1;
    component.totalPages = 2; // Mock totalPages
    const initialPage = component.currentPage
    component.nextPage();
    expect(component.currentPage).toEqual(initialPage + 1);
  });
  

});
