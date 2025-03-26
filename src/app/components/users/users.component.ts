import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {IToastrService} from '../../services/IToastr.service';
import {FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {error} from 'protractor';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public loading: boolean;
  public showUserForm: boolean;
  public users: any[];
  public userForm: UntypedFormGroup;

  constructor(
    private usersService: UsersService,
    private toastrService: IToastrService,
  ) {
  }

  public ngOnInit(): void {
    this.getUsers();
    this.createForm();
  }

  public toggleForm(): void {
    this.showUserForm = !this.showUserForm;
  }

  public createUser(): void {
    this.loading = true;
    this.usersService.createUser(this.userForm.getRawValue()).subscribe(
      success => {
        this.loading = false;
        this.toastrService.handleSuccess('Successfully created user');
        this.showUserForm = false;
        this.getUsers();
        this.createForm();
      }, error => {
        this.toastrService.handleError(error);
        this.loading = false;
      }
    );
  }

  public deleteUser(id: string): void {
    this.loading = true;
    this.usersService.deleteUser(id).subscribe(
      success => {
        this.toastrService.handleSuccess('Successfully deleted user');
        this.loading = false;
        this.getUsers();
      }, error => {
        this.toastrService.handleError(error);
        this.loading = false;
      }
    );
  }

  private getUsers(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users;
        this.loading = false;
      }, error => {
        this.toastrService.handleError(error);
        this.loading = false;
    }
    );
  }

  private createForm(): void {
    this.userForm = new FormGroup({
      firstName: new UntypedFormControl(null, Validators.required),
      lastName: new UntypedFormControl(null, Validators.required),
      username: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required),
      email: new UntypedFormControl(null, Validators.required)
    });
  }
}
