import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
  ],
})
export class LoginComponent {
  /**
   */
  validateForm: FormGroup<{
    mail: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    mail: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  /**
   */
  isLoading = false;

  /**
   *
   * @param fb
   * @param $auth
   */
  constructor(
    private fb: NonNullableFormBuilder,
    private $auth: AuthService,
    private localStorageBroker: LocalStorageBroker,
    private router: Router
  ) {}

  /**
   *
   */
  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      const email = this.validateForm.controls['mail'].value;
      const password = this.validateForm.controls['password'].value;

      this.$auth.login(email, password).subscribe({
        next: (response: any) => {
          this.localStorageBroker.storeToken(response.token);
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
