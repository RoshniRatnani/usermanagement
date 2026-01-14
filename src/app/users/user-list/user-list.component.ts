import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'All';
  selectedCategory: string = 'All'; // Default to All
  loading: boolean = false;
  error: string = '';
  showAddUserMenu: boolean = false;
  showCategoryDropdown: boolean = false;
  sidebarCollapsed: boolean = false;
  private isMobile: boolean = false;

  // Statistics
  get totalUsers(): number {
    return this.users.length;
  }

  get activeUsers(): number {
    return this.users.filter(u => u.status === 'Active').length;
  }

  get inactiveUsers(): number {
    return this.users.filter(u => u.status === 'In-Active').length;
  }

  // For demo purposes, split users into categories
  get adminUsers(): User[] {
    return this.users.slice(0, 3); // First 3 users as admins
  }

  get staffUsers(): User[] {
    return this.users.slice(3, 6); // Next 3 users as staff
  }

  get studentUsers(): User[] {
    return this.users.slice(6); // Remaining users as students
  }

  get adminCount(): number {
    return this.adminUsers.length;
  }

  get adminActive(): number {
    return this.adminUsers.filter(u => u.status === 'Active').length;
  }

  get adminInactive(): number {
    return this.adminUsers.filter(u => u.status === 'In-Active').length;
  }

  get staffCount(): number {
    return this.staffUsers.length;
  }

  get staffActive(): number {
    return this.staffUsers.filter(u => u.status === 'Active').length;
  }

  get staffInactive(): number {
    return this.staffUsers.filter(u => u.status === 'In-Active').length;
  }

  get studentCount(): number {
    return this.studentUsers.length;
  }

  get studentActive(): number {
    return this.studentUsers.filter(u => u.status === 'Active').length;
  }

  get studentInactive(): number {
    return this.studentUsers.filter(u => u.status === 'In-Active').length;
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.checkMobileView();
    this.sidebarCollapsed = this.isMobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkMobileView();
    if (this.isMobile) {
      this.sidebarCollapsed = true;
    }
  }

  private checkMobileView(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  isMobileView(): boolean {
    return this.isMobile;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const addDropdown = target.closest('.add-users-dropdown');
    const categoryDropdown = target.closest('.dropdown');
    
    if (!addDropdown && this.showAddUserMenu) {
      this.showAddUserMenu = false;
    }
    
    if (!categoryDropdown && this.showCategoryDropdown) {
      this.showCategoryDropdown = false;
    }
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  applyFilters(): void {
    let filtered = this.users;

    // Filter by category first
    if (this.selectedCategory === 'Admins') {
      filtered = this.adminUsers;
    } else if (this.selectedCategory === 'Staff') {
      filtered = this.staffUsers;
    } else if (this.selectedCategory === 'Students') {
      filtered = this.studentUsers;
    }
    // If 'All', use all users (no category filter)

    // Filter by status
    if (this.selectedStatus !== 'All') {
      filtered = filtered.filter(user => user.status === this.selectedStatus);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term)
      );
    }

    this.filteredUsers = filtered;
  }

  onSearchChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.showCategoryDropdown = false;
    this.applyFilters();
  }

  toggleCategoryDropdown(): void {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  viewProfile(userId: number): void {
    this.router.navigate(['/users', userId]);
  }

  toggleAddUserMenu(): void {
    this.showAddUserMenu = !this.showAddUserMenu;
  }

  addUser(type: string): void {
    this.showAddUserMenu = false;
    this.router.navigate(['/users/add'], { queryParams: { type: type } });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
