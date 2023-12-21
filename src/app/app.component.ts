import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { filter } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NzLayoutModule, NgIf, NgClass],
})
export class AppComponent {
  /**
   */
  isCollapsed = false;

  /**
   */
  isAuthPage = false;

  /**
   *
   * @param router
   */
  constructor(private router: Router) {
    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.isAuthPage = this.router.url === '/login';
      });
  }
}
