import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.less'],
  standalone: true,
  imports: [NgClass],
})
export class ToggleBtnComponent {
  /**
   */
  @Input()
  btnText!: string;

  /**
   */
  @Input()
  active!: boolean;

  /**
   */
  @Output()
  activeChange = new EventEmitter<boolean>();
}
