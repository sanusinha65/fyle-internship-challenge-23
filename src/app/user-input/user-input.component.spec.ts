import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInputComponent } from './user-input.component';
import { ApiService } from '../services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInputComponent],
      imports: [HttpClientTestingModule], 
      providers: [ApiService] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit user name on submitName', () => {
    const userName = '';
    let emittedUserName: string = '';
    component.userName = userName;
    component.submitNameEvent.subscribe((name: string) => {
      emittedUserName = name;
    });
    component.submitName();
    expect(emittedUserName).toEqual(userName);
  });

});
