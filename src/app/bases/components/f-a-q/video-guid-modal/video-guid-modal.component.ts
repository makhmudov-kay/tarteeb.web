import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { GuidList } from '../guid-list.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-guid-modal',
  templateUrl: './video-guid-modal.component.html',
  styleUrls: ['./video-guid-modal.component.less'],
  standalone: true,
  imports: [NzModalModule],
})
export class VideoGuidModalComponent {
  /**
   */
  @Input()
  isVisible!: boolean;

  /**
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  /**
   */
  @Input()
  data!: GuidList;

  /**
   */
  sanitizer = inject(DomSanitizer);

  /**
   *
   */
  handleCancel() {
    this.isVisibleChange.emit(false);
  }
}
