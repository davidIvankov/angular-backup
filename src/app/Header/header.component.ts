import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class Header implements OnInit, OnDestroy {
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}
  collapsed = true;
  isLogedIn = false;
  authSub: Subscription;

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe((user: User) => {
      this.isLogedIn = !!user;
    });
  }

  onSave() {
    this.dataStorageService.storeRecepies();
  }

  onLogout() {
    this.authService.logout();
  }

  onFatch() {
    this.dataStorageService.getRecepies().subscribe();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
