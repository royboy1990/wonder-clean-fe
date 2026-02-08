import {Injectable} from '@angular/core';
import {Observable, of, switchMap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import {environment as env} from '../../../../environments/environment'
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";

const url = `${env.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router) {

  }


  logout(): void {
    localStorage.removeItem('accessToken');
    this.userService.setUser(null);
    this.router.navigate(['/home']);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.httpClient.post<{ token: string }>(`${url}/login`, credentials).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage
        localStorage.setItem('accessToken', response.token);

        // Save the user data in the user service
        this.userService.setUser(response.user);


        // Return a new observable with the response
        return of(response);
      })
    );
  }

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.httpClient.post<{ token: string }>(`${url}/register`, user).pipe(
      switchMap((response: any) => {
        if (response.message) {
          return throwError(response.message);
        }
        localStorage.setItem('accessToken', response.token);

        // Save the user data in the user service
        this.userService.setUser(response.user);

        return of(response);
      })
    );
  }

}
