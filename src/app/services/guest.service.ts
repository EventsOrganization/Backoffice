import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

enum GuestUrls {
  getAllGuests = 'api/Guest/GetAll',
  createGuest = 'api/Guest/CreateGuest',
  deleteGuest = 'api/Guest/DeleteGuest',
  saveEventInformation = 'api/Guest/SaveEventInformation',
}

@Injectable({
  providedIn: 'root',
})

export class GuestService {
  constructor(
    private http: HttpClient
  ) {
  }

  public getAllGuests(): Observable<any[]> {
    return this.http.get<any>(environment.apiUrl + GuestUrls.getAllGuests);
  }

  public createGuest(request: any): Observable<any[]> {
    return this.http.post<any>(environment.apiUrl + GuestUrls.createGuest, request);
  }

  public deleteGuest(id: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + GuestUrls.deleteGuest, {params: {id: id}});
  }

  public saveInformation(request: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + GuestUrls.saveEventInformation, request);
  }
}
