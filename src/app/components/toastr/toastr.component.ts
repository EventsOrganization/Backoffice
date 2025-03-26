import {Component, OnDestroy, OnInit} from '@angular/core';
import {Toast} from '../../models/toastr.model';
import {Subscription} from 'rxjs';
import {IToastrService} from '../../services/IToastr.service';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnDestroy {
  public toasts: Toast[] = [];
  public subscription: Subscription;

  constructor(private toastrService: IToastrService) {
    this.subscription = this.toastrService.toasts.subscribe(toast => {
      if (toast) {
        this.toasts.push(toast);
      } else {
        this.toasts = [];
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onClose(toast: Toast): void {
    this.toasts.forEach((element, index) => {
      if (element.id === toast.id) {
        this.toasts.splice(index, 1);
      }
    });
  }
}
