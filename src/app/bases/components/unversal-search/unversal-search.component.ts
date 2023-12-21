import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SvgSearchComponent } from '../../svg/svg-search/svg-search.component';
import { SvgFilterComponent } from '../../svg/svg-filter/svg-filter.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unversal-search',
  templateUrl: './unversal-search.component.html',
  styleUrls: ['./unversal-search.component.less'],
  standalone: true,
  imports: [
    NzInputModule,
    SvgSearchComponent,
    SvgFilterComponent,
    FormsModule,
    NgClass,
  ],
})
export class UnversalSearchComponent {
  /**
   */
  @Output()
  value = new EventEmitter<string>();

  /**
   */
  @Input()
  activeFilter!: boolean;

  /**
   */
  @Output()
  activeFilterChange = new EventEmitter<boolean>();

  /**
   */
  searchValue = '';

  router = inject(Router);

  /**
   */
  get active() {
    if (this.router.url.includes('attendance')) {
      return false;
    }
    const isActiveFilter = sessionStorage.getItem('showFilter');
    return isActiveFilter ? JSON.parse(isActiveFilter) : false;
  }

  /**
   *
   * @param value
   */
  changeSearchValue(value: string) {
    this.searchValue = value;
    this.value.emit(value);
  }

  /**
   *
   */
  toggleActive() {
    sessionStorage.setItem('showFilter', JSON.stringify(!this.active));
    this.activeFilterChange.emit(!this.activeFilter);
  }
}
