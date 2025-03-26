import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GuestService} from '../../services/guest.service';
import {IToastrService} from '../../services/IToastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public loading: boolean;
  public showGuestForm: boolean;
  public showEventForm: boolean;
  public eventForm: FormGroup;
  public guestForm: FormGroup;
  public guests: any;

  constructor(
    private guestService: GuestService,
    private toastrService: IToastrService
  ) {
  }

  public ngOnInit(): void {
    this.getGuests();
    this.createEventForm();
    this.createGuestForm();
  }

  public toggleEventForm(): void {
    this.showEventForm = !this.showEventForm;
  }

  public toggleGuestForm(): void {
    this.showGuestForm = !this.showGuestForm;
  }

  public deleteGuest(guest: any): void {
    this.loading = true;
    this.guestService.deleteGuest(guest.id).subscribe(
      success => {
        this.getGuests();
        this.toastrService.handleSuccess('Successfully deleted guest!');
        this.loading = false;
      }, error => {
        this.loading = false;
        this.toastrService.handleError('Unable to delete guest!');
      }
    );
  }

  public saveInfo(): void {
    this.loading = true;
    this.guestService.saveInformation(this.eventForm.getRawValue()).subscribe(
      response => {
        this.toastrService.handleSuccess('Success save event information!');
        this.loading = false;
      }, error => {
        this.loading = false;
        this.toastrService.handleError('Unable to save event information!');
      }
    );
  }

  public createGuest(): void {
    this.loading = true;
    this.guestService.createGuest(this.guestForm.getRawValue()).subscribe(
      success => {
        this.getGuests();
        this.toastrService.handleSuccess('Successfully created guest!');
        this.createGuestForm();
        this.loading = false;
      }, error => {
        this.loading = false;
        this.toastrService.handleError('Unable to create guest!');
      }
    );
  }

  private getGuests(): void {
    this.loading = true;
    this.guestService.getAllGuests().subscribe(
      (guests: any[]) => {
        this.guests = guests;
        this.loading = false;
      }, error => {
        this.loading = false;
      }
    );
  }

  private createEventForm(): void {
   this.eventForm = new FormGroup({
     location: new FormControl(null, Validators.required),
     date: new FormControl(null, Validators.required),
     message: new FormControl(null, Validators.required),
     event: new FormControl(null, Validators.required)
   });
  }

  private createGuestForm(): void {
   this.guestForm = new FormGroup({
     firstName: new FormControl(null, Validators.required),
     lastName: new FormControl(null, Validators.required),
     message: new FormControl(null, Validators.required),
   });
  }
}
