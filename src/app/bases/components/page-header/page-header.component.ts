import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UnversalSearchComponent } from '../unversal-search/unversal-search.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgIf } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SvgDirArrowComponent } from '../../svg/svg-dir-arrow/svg-dir-arrow.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  standalone: true,
  imports: [
    UnversalSearchComponent,
    NzButtonModule,
    NgIf,
    NzIconModule,
    SvgDirArrowComponent,
    RouterLink,
  ],
})
export class PageHeaderComponent {
  /**
   */
  @Input()
  title!: string;

  /**
   */
  @Input()
  btnText!: string;

  /**
   */
  @Input()
  activeFilter!: boolean;

  /**
   */
  @Input()
  searchBar = true;

  /**
   */
  @Input()
  btnBack = false;

  /**
   */
  @Output()
  activeFilterChange = new EventEmitter<boolean>();

  /**
   */
  @Output()
  searchValue = new EventEmitter<string>();

  /**
   */
  @Output()
  handleEvent = new EventEmitter();

  /**
   */
  @Input()
  isLoading!: boolean;
}
