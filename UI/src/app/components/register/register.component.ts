import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistration } from '../../models/userRegistration';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.register(value.email, value.password, value.confirmPassword)        
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