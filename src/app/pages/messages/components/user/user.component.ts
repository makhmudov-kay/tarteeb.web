import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgSentMarkComponent } from 'src/app/bases/svg/svg-sent-mark/svg-sent-mark.component';
import { NewClient } from '../../pipe/serach-user-by-name.pipe';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  standalone: true,
  imports: [SvgSentMarkComponent, NgClass],
})
export class UserComponent {
  /**
   */
  @Input()
  client!: NewClient;

  /**
   */
  @Input()
  isActive!: boolean;
}
