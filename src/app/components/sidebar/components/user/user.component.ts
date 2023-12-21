import { NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { SvgBellComponent } from 'src/app/bases/svg/svg-bell/svg-bell.component';
import { SvgLogOutComponent } from 'src/app/bases/svg/svg-log-out/svg-log-out.component';
import { SvgProfileComponent } from 'src/app/bases/svg/svg-profile/svg-profile.component';
import { UserCredentials } from 'src/app/models/user-credentials/user-credential.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  standalone: true,
  imports: [
    SvgProfileComponent,
    SvgBellComponent,
    SvgLogOutComponent,
    NgClass,
    NgClickOutsideDirective,
    RouterLink,
    RouterLinkActive,
  ],
})
export class UserComponent {
  /**
   */
  @Input()
  isCollapsed!: boolean;

  /**
   */
  @Input()
  user!: UserCredentials;

  /**
   */
  badgeCount = 15;

  /**
   */
  isUserMenuVisible = false;

  /**
   */
  auth$ = inject(AuthService);
  router = inject(Router);

  /**
   *
   * @param e
   */
  toggleVisible(e: Event) {
    this.isUserMenuVisible = !this.isUserMenuVisible;
    e.stopPropagation();
  }

  /**
   *
   */
  logout() {
    this.auth$.logout();
    this.router.navigate(['./login'])
  }
}
