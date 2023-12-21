import { NgClass, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { VideoGuidModalComponent } from './video-guid-modal/video-guid-modal.component';
import { GuidList } from './guid-list.model';

@Component({
  selector: 'app-f-a-q',
  templateUrl: './f-a-q.component.html',
  styleUrls: ['./f-a-q.component.less'],
  standalone: true,
  imports: [NgClass, NgFor, VideoGuidModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FAQComponent {
  /**
   */
  @Input()
  guidList!: GuidList[];

  /**
   */
  isOpen = false;

  /**
   */
  isVisible = false;

  /**
   */
  guide!: GuidList;

  /**
   */
  cd = inject(ChangeDetectorRef);

  /**
   *
   */
  openList() {
    this.isOpen = !this.isOpen;
  }

  /**
   *
   * @param index
   */
  openModal(guide: GuidList) {
    this.guide = guide;
    this.isVisible = true;
    this.cd.markForCheck();
  }
}
