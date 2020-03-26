import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistration } from '../../models/userRegistration';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  errors: string;
  submitted: boolean = false;
  isRequesting: boolean;
  isValidConfirmPassword: boolean = false;
  registrationValue: UserRegistration = { email: '', password: '', confirmPassword: '' };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  checkValidConfirmPassword(password: string, confirmPassword: string) {
    if (confirmPassword == password || confirmPassword == '') {
      this.isValidConfirmPassword = true;
    } else {
      this.isValidConfirmPassword = false;
    }
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.register(value.email, value.password)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
            }
          },
          error => this.errors = error);
    }
  }
}