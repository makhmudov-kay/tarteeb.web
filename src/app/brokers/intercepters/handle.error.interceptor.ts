import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export interface ErrorModel {
  errors: { key: string; value: string }[];
  status: number;
  title: string;
  type: string;
}

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private message: NzNotificationService,
    private $auth: AuthService,
    private router: Router
  ) {}

  /**
   *
   * @param req
   * @param next
   * @returns
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.$auth.logout();
          this.router.navigate(['login']);
          return throwError(() => error);
        }

        const errorCustom = this.getServerErrors(error);
        const errorText = this.getErrorFromServer(error);
        const errorDetails = this.formatErrors(
          errorText.unknownError.error.errors
        );

        const firstError = Object.keys(errorText.unknownError.error.errors)[0];
        this.message.create(
          'error',
          errorText.unknownError.error.title,
          errorDetails
        );
        return throwError(() => errorCustom);
      })
    );
  }

  formatErrors(errors: any): string {
    let errorMessage = '';

    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const errorDetails = errors[key];
        errorMessage += `
        <p>${key}: ${errorDetails.join(', ')}
        </p>`;
      }
    }

    return errorMessage.trim();
  }

  private getServerErrors(error: HttpErrorResponse) {
    if (!navigator.onLine) {
      return 'Offline';
    }

    switch (error.status) {
      case HttpStatusCode.PayloadTooLarge:
        return 'PayloadTooLarge';

      case HttpStatusCode.Forbidden:
        return 'Forbidden';

      case HttpStatusCode.InternalServerError:
        return 'InternalServerError';

      case HttpStatusCode.NotFound:
        return 'NotFound';

      default:
        return this.getErrorFromServer(error);
    }
  }

  /**
   *
   * @param error
   * @returns
   */
  private getErrorFromServer(error: HttpErrorResponse) {
    const errors = (error.error as ErrorModel).errors;
    return { unknownError: error };
  }
}
