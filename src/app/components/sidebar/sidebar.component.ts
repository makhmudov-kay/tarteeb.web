import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SvgDashboardComponent } from 'src/app/bases/svg/svg-dashboard/svg-dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserComponent } from './components/user/user.component';
import { SvgArrowComponent } from 'src/app/bases/svg/svg-arrow/svg-arrow.component';
import { NgClass } from '@angular/common';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { UserCredentials } from 'src/app/models/user-credentials/user-credential.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  standalone: true,
  imports: [
    NzMenuModule,
    SvgDashboardComponent,
    MenuComponent,
    UserComponent,
    SvgArrowComponent,
    NgClass,
  ],
})
export class SidebarComponent implements OnInit {
  /**
   */
  @Input()
  isCollapsed = false;

  /**
   */
  @Output()
  isCollapsedChange = new EventEmitter<boolean>();

  /**
   */
  user!: UserCredentials;

  /**
   */
  localStorageBroker = inject(LocalStorageBroker);

  /**
   *
   */
  ngOnInit(): void {
    this.user = this.localStorageBroker.readUserCredential();
  }

  /**
   *
   */
  toggleCollapse() {
    this.isCollapsedChange.emit(!this.isCollapsed);
  }
}
