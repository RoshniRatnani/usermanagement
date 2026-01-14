import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'john.com',
      company: { name: 'Test Company' },
      address: { city: 'Test City' },
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      phone: '098-765-4321',
      website: 'jane.com',
      company: { name: 'Another Company' },
      address: { city: 'Another City' },
      status: 'In-Active'
    }
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    
    component.ngOnInit();
    
    expect(component.users.length).toBe(2);
    expect(component.filteredUsers.length).toBe(2);
    expect(component.loading).toBe(false);
  });

  it('should handle error when loading users', () => {
    userService.getUsers.and.returnValue(throwError(() => new Error('API Error')));
    
    component.ngOnInit();
    
    expect(component.error).toBeTruthy();
    expect(component.loading).toBe(false);
  });

  it('should filter users by status', () => {
    component.users = mockUsers;
    component.filteredUsers = mockUsers;
    
    component.onStatusChange('Active');
    
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].status).toBe('Active');
  });

  it('should filter users by search term', () => {
    component.users = mockUsers;
    component.filteredUsers = mockUsers;
    
    const event = { target: { value: 'john' } } as any;
    component.onSearchChange(event);
    
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');
  });
});
