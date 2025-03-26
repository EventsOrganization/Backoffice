import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

enum userApis {
  getUsers = 'api/Users/GetUsers',
  createUser = 'api/Users/CreateUser',
  deleteUser = 'api/Users/DeleteUser'
}

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  constructor(
    private http: HttpClient
  ) {
  }

  public getUsers(): Observable<any[]> {
    return this.http.get<any>(environment.apiUrl + userApis.getUsers);
  }

  public createUser(request: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + userApis.createUser, request);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + userApis.deleteUser, {params: {id: id}});
  }
}
