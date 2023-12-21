import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { from, takeUntil } from 'rxjs';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { GroupService } from 'src/app/services/groups/group.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.less'],
  standalone: true,
  imports: [
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
  ],
  providers: [NgDestroy],
})
export class AddEditModalComponent implements OnInit {
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
  @Output()
  createNewGroup = new EventEmitter();

  /**
   */
  form!: UntypedFormGroup;

  /**
   */
  isLoading = false;

  /**
   *
   * @param fb
   * @param cd
   * @param $destroy
   */
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy,
    private $group: GroupService
  ) {}

  /**
   *
   */
  private markAsDirty() {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      Name: ['', [Validators.required]],
    });
  }

  /**
   *
   */
  handleOk() {
    this.isVisibleChange.emit(false);
  }

  /**
   *
   */
  handleCancel() {
    this.isVisibleChange.emit(false);
  }

  /**
   *
   */
  submit() {
    if (this.form.invalid) {
      this.markAsDirty();
      return;
    }
    const request = this.form.getRawValue();
    this.isLoading = true;
    this.$group
      .post(request)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        console.log(result);
        this.isLoading = false;
        this.handleCancel();
        this.createNewGroup.emit();
        this.cd.markForCheck();
      });
  }
}
