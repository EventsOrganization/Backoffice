import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {Toast, ToastType} from '../../../models/toastr.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() toast: Toast;
  @Output() onClose: EventEmitter<Toast>;

  public shown: boolean;
  public animationDuration = 500;

  private timerSubscription: Subscription;
  private fadeOutSubscription: Subscription;

  constructor() {
    this.onClose = new EventEmitter<Toast>();
  }

  public ngOnInit(): void {
    const duration = this.toast.duration * 1000 - this.animationDuration;
    this.timerSubscription = timer(duration).subscribe(elapsed => this.close());
    this.shown = true;
  }

  public ngOnDestroy(): void {
    if (this.fadeOutSubscription) {
      this.fadeOutSubscription.unsubscribe();
    }

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public getClass(toastType: ToastType): string {
    if (toastType === ToastType.ERROR) {
      return 'icon-TiWarningOutline';
    } else if (toastType === ToastType.WARNING) {
      return 'icon-FiXOctagon';
    } else if (toastType === ToastType.SUCCESS) {
      return 'icon-check-circle';
    } else if (toastType === ToastType.INFO) {
      return 'icon-FiAlertOctagon';
    }
    return '';
  }

  public getTextColorClass(toastType: string): string {
    if (toastType === ToastType.ERROR || toastType === ToastType.WARNING) {
      return '#F55658';
    } else if (toastType === ToastType.SUCCESS) {
      return '#00BB83';
    } else if (toastType === ToastType.INFO) {
      return '#FFAC43';
    }
    return '';
  }

  public getBackgroundColor(toastType: ToastType): string {
    if (toastType === ToastType.ERROR || toastType === ToastType.WARNING) {
      return '#FEEFEF';
    } else if (toastType === ToastType.SUCCESS) {
      return '#D7FFF4';
    } else if (toastType === ToastType.INFO) {
      return '#FFF7ED';
    }
    return '';
  }

  public close(): void {
    if (this.fadeOutSubscription) {
      this.fadeOutSubscription.unsubscribe();
    }

    this.shown = false;
    this.fadeOutSubscription = timer(this.animationDuration).subscribe(elapsed => this.onClose.emit(this.toast));
  }
}
