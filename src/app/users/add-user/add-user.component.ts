import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  userType: string = 'Staff';
  activeTab: string = 'personal';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      role: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateOfBirth: ['', Validators.required],
      bloodGroup: [''],
      joiningDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      spouseName: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      city: [''],
      state: [''],
      pincode: ['']
    });
  }

  ngOnInit(): void {
    // Get user type from query params if available
    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.userType = params['type'];
        this.userForm.patchValue({ role: params['type'] });
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      alert('User created successfully! (This is a demo)');
      this.router.navigate(['/users']);
    } else {
      alert('Please fill all required fields correctly');
      this.markFormGroupTouched(this.userForm);
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
