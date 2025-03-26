import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IToastrService} from './IToastr.service';
import {Toast, ToastType} from '../models/toastr.model';


@Injectable()
export class ToastrService implements IToastrService {
  private static readonly DefaultDuration = 5;

  private toastSubject = new Subject<Toast>();

  constructor(
  ) {
  }

  public get toasts(): Observable<Toast> {
    return this.toastSubject;
  }

  public handleError(errorResponse: any): void {
    let statusCode: any;
    if (errorResponse.status) {
      statusCode = errorResponse.status;
    } else {
      statusCode = 500;
    }

    const serviceUnavailable = this.isServiceUnavailable(errorResponse.status);
    let content: string;
    if (serviceUnavailable) {
      content = 'errors.service-unavailable';
    } else if (errorResponse.error && errorResponse.error.errorTranslation) {
      content = errorResponse.error.errorTranslation;
    } else if (errorResponse.error && errorResponse.error.errorMessage) {
      content = errorResponse.error.errorMessage;
    } else {
      content = 'errors.default-error';
    }

    const toast: Toast = {
      id: Math.random().toString(),
      duration: ToastrService.DefaultDuration,
      content: content,
      params: {value: statusCode},
      toastType: ToastType.ERROR
    };

    this.toastSubject.next(toast);
  }

  public handleCustomError(key: string, value?: string): void {
    const toast: Toast = {
      id: Math.random().toString(),
      duration: ToastrService.DefaultDuration,
      content: key,
      params: {value: value},
      toastType: ToastType.ERROR
    };
    this.toastSubject.next(toast);
  }

  public handleSuccess(key: string, value?: string): void {
    const toast: Toast = {
      id: Math.random().toString(),
      duration: ToastrService.DefaultDuration,
      content: key,
      params: {value: value},
      toastType: ToastType.SUCCESS
    };
    this.toastSubject.next(toast);
  }

  public handleToast(toast: Toast): void {
    this.toastSubject.next(toast);
  }

  private isServiceUnavailable(errorStatus: number): boolean {
    return (errorStatus.toString().startsWith('5'));
  }
}
