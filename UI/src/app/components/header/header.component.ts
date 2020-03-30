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

  navStatus: boolean = false;
  userName: string = '';
  subscription: Subscription;
  search: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    this.navStatus = false;
  }

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(navStatus => this.navStatus = navStatus);
    if (this.navStatus) {
      this.userName = localStorage.getItem('user_name');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.navStatus = false;
    this.userName = '';
    localStorage.removeItem('search_value');
  }

  public valueChangeSearch() {
    localStorage.setItem('search_value', this.search);
  }
}
