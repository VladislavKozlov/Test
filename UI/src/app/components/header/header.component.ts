import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  navStatus: boolean;
  subscription: Subscription;

  constructor(private userService: UserService, private router: Router) {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(navStatus => this.navStatus = navStatus);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
