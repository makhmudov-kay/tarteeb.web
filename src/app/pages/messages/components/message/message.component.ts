import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgDangerComponent } from 'src/app/bases/svg/svg-danger/svg-danger.component';
import { SvgSentMarkComponent } from 'src/app/bases/svg/svg-sent-mark/svg-sent-mark.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less'],
  standalone: true,
  imports: [
    SvgSentMarkComponent,
    SvgDangerComponent,
    NgClass,
    NgIf,
    DatePipe,
    NzToolTipModule,
  ],
})
export class MessageComponent {
  @Input()
  message!: any;

  isError = true;
}
