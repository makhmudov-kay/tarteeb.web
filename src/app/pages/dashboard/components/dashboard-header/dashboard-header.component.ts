import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SvgGraphComponent } from 'src/app/bases/svg/svg-graph/svg-graph.component';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { SvgUpdateComponent } from 'src/app/bases/svg/svg-update/svg-update.component';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.less'],
  standalone: true,
  imports: [
    SvgGraphComponent,
    SvgUpdateComponent,
    NzButtonModule,
    NgIf,
    NzIconModule],
})
export class DashboardHeaderComponent {

   /**
   */
   @Input()
   title!: string;
 
   /**
    */
   @Input()
   btnText!: string;
 
   /**
 ew EventEmitter<string>();
 
   /**
    */
   @Output()
   handleEvent = new EventEmitter();
 
   /**
    */
   @Input()
   isLoading!: boolean;
 }
