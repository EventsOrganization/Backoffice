import {Toast} from '../models/toastr.model';
import {Observable} from 'rxjs';

export abstract class IToastrService {

  public abstract get toasts(): Observable<Toast>;

  public abstract handleError(errorResponse: any): void;

  public abstract handleCustomError(key: string, value?: string): void;

  public abstract handleSuccess(key: string, value?: string): void;

  public abstract handleToast(toast: Toast): void;
}
