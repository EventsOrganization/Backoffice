export interface Toast {
  id: string;
  duration: number;
  content: string;
  params?: any;
  toastType: ToastType;
}

export enum ToastType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info'
}
