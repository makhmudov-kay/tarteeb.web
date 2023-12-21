import { takeUntil } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SvgCloseComponent } from 'src/app/bases/svg/svg-close/svg-close.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { Options } from 'src/app/models/common/common.models';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { ServiceOfferingService } from 'src/app/services/service-offerings/service-offering.service';
import { ServiceOffering } from 'src/app/models/service-offerings/service-offering.model';
import { PersonalDataComponent } from '../personal-data/personal-data.component';
import { SelectorDataComponent } from '../selector-data/selector-data.component';
import { ClientService } from 'src/app/services/clients/client.service';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { ContractService } from 'src/app/services/contracts/contract.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { SvgInvoicesComponent } from 'src/app/bases/svg/svg-invoices/svg-invoices.component';
import { Client } from 'src/app/models/clients/client.model';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.less'],
  standalone: true,
  imports: [
    NzModalModule,
    SvgCloseComponent,
    NzStepsModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NgFor,
    SelectorComponent,
    SvgGroupsComponent,
    NzButtonModule,
    PersonalDataComponent,
    SelectorDataComponent,
    NzNotificationModule,
    SvgInvoicesComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroy],
})
export class AddStudentModalComponent implements OnInit {
  /**
   */
  @Input()
  isVisible!: boolean;

  /**
   */
  private _groupIdOption!: Options[];
  public get groupIdOption(): Options[] {
    return this._groupIdOption;
  }
  @Input()
  public set groupIdOption(v: Options[]) {
    const filteredGroup = v.filter((group) => group.label !== 'All groups');
    this.currentGroup = filteredGroup[0].value;
    this._groupIdOption = filteredGroup;
    this.cd.markForCheck();
  }

  /**
   */
  currentGroup!: string;

  /**
   */
  @Input()
  form!: UntypedFormGroup;

  /**
   */

  private _editingGroupId!: string | null;
  public get editingGroupId(): string | null {
    return this._editingGroupId;
  }
  @Input()
  public set editingGroupId(v: string | null) {
    this._editingGroupId = v;
    if (v) {
      this.currentGroup = v;
      this.cd.markForCheck();
    }
  }

  /**
   */
  @Output()
  editingGroupIdChange = new EventEmitter();

  /**
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  /**
   */
  @Output()
  refresh = new EventEmitter();

  /**
   */
  @Input()
  selectedPrefix!: string;

  /**
   */
  @Input()
  client!: Client;

  /**
   */
  phonePrefix = ['+998', '+996', '+770'];

  /**
   */
  prefix = this.phonePrefix[0];

  /**
   */
  currentCourse!: string;

  /**
   */
  current = 0;

  /**
   */
  isLoading = false;

  /**
   */
  courses: Options[] = [];

  /**
   *
   * @param cd
   * @param $courses
   * @param $client
   * @param $destroy
   * @param $contract
   * @param $notification
   */
  constructor(
    private cd: ChangeDetectorRef,
    private $courses: ServiceOfferingService,
    private $client: ClientService,
    private $destroy: NgDestroy,
    private $contract: ContractService,
    private $notification: NzNotificationService
  ) {}

  /**
   *
   */
  private getCourses() {
    this.$courses.getServiceOfferings().subscribe((course) => {
      const mappedData = course.map((el: ServiceOffering) => {
        return {
          value: el.id,
          label: el.title + ' - ' + el.billingPrice,
        };
      });
      this.courses.push(...mappedData);
      this.currentCourse = mappedData[0].value;
    });
  }

  /**
   *
   * @param control
   */
  private markFormControlsValidations(control: string) {
    this.form.controls[control].markAsDirty();
    this.form.controls[control].updateValueAndValidity({
      onlySelf: true,
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.getCourses();
  }

  /**
   *
   */
  handleOk(): void {
    this.isVisible = false;
    this.cd.markForCheck();
  }

  /**
   *
   */
  handleCancel(): void {
    this.isVisibleChange.emit(false);
    this.current = 0;
    this.editingGroupIdChange.emit();
    this.cd.markForCheck();
  }

  /**
   *
   */
  pre(): void {
    this.current -= 1;
    this.cd.markForCheck();
  }

  /**
   *
   */
  next(): void {
    if (this.current === 0) {
      if (this.form.invalid) {
        if (this.form.controls['firstName'].invalid) {
          this.markFormControlsValidations('firstName');
        }
        if (this.form.controls['lastName'].invalid) {
          this.markFormControlsValidations('lastName');
        }
        if (this.form.controls['phoneNumber'].invalid) {
          this.markFormControlsValidations('phoneNumber');
        }
        return;
      }
    }
    this.current += 1;
    this.cd.markForCheck();
  }

  /**
   *
   */
  addEditStudent() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.editingGroupId) {
      const formRequest = this.form.getRawValue();
      let request = { ...this.client };
      request.firstName = formRequest.firstName;
      request.lastName = formRequest.lastName;
      request.phoneNumber = this.prefix + formRequest.phoneNumber;
      request.updatedDate = new Date();
      request.groupId = this.currentGroup;

      this.$client.putClient(request).subscribe(() => {
        this.successActions('Student updated');
      });
      this.isLoading = false;
      this.cd.markForCheck();
      return;
    }

    const request = this.form.getRawValue();
    request.phoneNumber = this.prefix + request.phoneNumber;
    request.groupId = this.currentGroup;
    this.addNewStudent(request);
  }

  /**
   *
   * @param request
   */
  private addNewStudent(request: any) {
    this.$client
      .post(request)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        if (result.id) {
          this.$contract
            .createContract(result.id, this.currentCourse)
            .pipe(takeUntil(this.$destroy))
            .subscribe(() => {
              this.successActions('Student saved');
            });
          this.isLoading = false;
          this.cd.markForCheck();
        }
      });
  }

  /**
   *
   * @param message
   */
  private successActions(message: string) {
    this.isVisibleChange.emit(false);
    this.refresh.emit();
    this.form.reset();
    this.currentGroup = this.groupIdOption[0].value;
    this.currentCourse = this.courses[0].value;
    this.$notification.success(message, '');
    this.current = 0;
    this.isLoading = false;
    this.cd.markForCheck();
  }

  /**
   *
   * @param prefix
   */
  prefixChange(prefix: string) {
    this.prefix = prefix;
    this.cd.markForCheck();
  }

  /**
   *
   * @param id
   */
  filterByGroupSelector(id: string) {
    this.currentGroup = id;
    this.cd.markForCheck();
  }

  /**
   *
   * @param id
   */
  filterByCourseSelector(id: string) {
    this.currentCourse = id;
    this.cd.markForCheck();
  }
}
