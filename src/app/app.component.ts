import {AuthService} from './services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  public ngOnInit(): void {
    // this.router.navigate(['/login']);
    this.authRefresh();
  }

  private authRefresh(): void {
    this.authService.refresh().subscribe((response) => {
      if (!response.Success) {
        return;
      }
      this.authService.loggedIn(response.Data);
    });
  }
}
