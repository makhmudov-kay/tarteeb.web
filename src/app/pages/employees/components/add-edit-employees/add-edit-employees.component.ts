import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { takeUntil } from 'rxjs';
import { SvgCloseComponent } from 'src/app/bases/svg/svg-close/svg-close.component';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { Options } from 'src/app/models/common/common.models';
import { Contractor } from 'src/app/models/contractors/contractor.model';
import { PersonalDataComponent } from 'src/app/pages/students/components/personal-data/personal-data.component';
import { SelectorDataComponent } from 'src/app/pages/students/components/selector-data/selector-data.component';
import { ContractorService } from 'src/app/services/contractors/contractor.service';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';

@Component({
  selector: 'app-add-edit-employees',
  templateUrl: './add-edit-employees.component.html',
  styleUrls: ['./add-edit-employees.component.less'],
  standalone: true,
  imports: [
    NzModalModule,
    SvgCloseComponent,
    NzStepsModule,
    NgIf,
    NzButtonModule,
    PersonalDataComponent,
    SelectorDataComponent,
    NzNotificationModule,
    SvgGroupsComponent,
    NzNotificationModule,
  ],
})
export class AddEditEmployeesComponent {
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
  isEdit!: boolean;

  /**
   */
  @Input()
  form!: UntypedFormGroup;

  /**
   */
  private _departmentIdOption!: Options[];
  public get departmentIdOption(): Options[] {
    return this._departmentIdOption;
  }
  @Input()
  public set departmentIdOption(v: Options[]) {
    const filteredDepartment = v.filter(
      (department) => department.label !== 'All departments'
    );
    this.currentDepartment = filteredDepartment[0].value;
    this._departmentIdOption = filteredDepartment;
    this.cd.markForCheck();
  }

  /**
   */
  private _editingDepartmentId!: string | null;
  public get editingDepartmentId(): string | null {
    return this._editingDepartmentId;
  }
  @Input()
  public set editingDepartmentId(v: string | null) {
    this._editingDepartmentId = v;
    if (v) {
      this.currentDepartment = v;
      this.cd.markForCheck();
    }
  }

  /**
   */
  @Output()
  editingDepartmentIdChange = new EventEmitter();

  /**
   */
  @Output()
  refresh = new EventEmitter();

  /**
   */
  @Input()
  employee!: Contractor;

  /**
   */
  @Input()
  selectedPrefix!: string;

  /**
   */
  currentDepartment!: string;

  /**
   */
  current = 0;

  /**
   */
  phonePrefix = ['+998', '+996', '+770'];

  /**
   */
  prefix = this.phonePrefix[0];

  /**
   */
  isLoading = false;

  /**
   */
  cd = inject(ChangeDetectorRef);
  $contractor = inject(ContractorService);
  $destroy = inject(NgDestroy);
  $notification = inject(NzNotificationService);

  constructor() {
    console.log('modal');
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
  handleCancel(): void {
    this.isVisibleChange.emit(false);
    this.current = 0;
    this.editingDepartmentIdChange.emit();
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
      if (this.form.controls['firstName'].invalid) {
        this.markFormControlsValidations('firstName');
        return;
      }
      if (this.form.controls['lastName'].invalid) {
        this.markFormControlsValidations('lastName');
        return;
      }
      if (this.form.controls['phoneNumber'].invalid) {
        this.markFormControlsValidations('phoneNumber');
        return;
      }
    }
    if (this.current === 1) {
      if (this.form.controls['email'].invalid) {
        this.markFormControlsValidations('email');
        return;
      }
      if (this.form.controls['birthDate'].invalid) {
        this.markFormControlsValidations('birthDate');
        return;
      }
      if (this.form.controls['password'].invalid) {
        this.markFormControlsValidations('phoneNumber');
        return;
      }
    }
    this.current += 1;
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
  filterByDepartmentSelector(id: string) {
    this.currentDepartment = id;
    this.cd.markForCheck();
  }

  /**
   *
   */
  addEditStudent() {
    if (this.form.invalid) {
      console.log('invalid');

      return;
    }

    this.isLoading = true;
    if (this.editingDepartmentId) {
      console.log('not');
      const formRequest = this.form.getRawValue();
      let request = { ...this.employee };
      request.firstName = formRequest.firstName;
      request.lastName = formRequest.lastName;
      request.phoneNumber = this.prefix + formRequest.phoneNumber;
      request.updatedDate = new Date();
      request.groupId = this.currentDepartment;
      // EDIT METHOD
      this.editEmployee(request);

      this.isLoading = false;
      this.cd.markForCheck();
      return;
    }

    const request = this.form.getRawValue();
    request.phoneNumber = this.prefix + request.phoneNumber;
    request.groupId = this.currentDepartment;
    this.addNewEmployee(request);
  }

  /**
   *
   * @param request
   */
  private editEmployee(request: Contractor) {
    this.$contractor
      .edit(request)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (result) => {
          if (result.id) {
            this.successActions('Employee saved');
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.cd.markForCheck();
        },
      });
  }

  /**
   *
   * @param request
   */
  private addNewEmployee(request: Contractor) {
    this.$contractor
      .create(request)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (result) => {
          if (result.id) {
            this.successActions('Employee saved');
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.cd.markForCheck();
        },
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
    this.currentDepartment = this.departmentIdOption[0].value;
    this.$notification.success(message, '');
    this.current = 0;
    this.isLoading = false;
    this.cd.markForCheck();
  }
}
