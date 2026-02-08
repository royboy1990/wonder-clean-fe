import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {User} from "../../models/user.model";
import {environment as env} from "../../../environments/environment";

const url = `${env.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public _user = new ReplaySubject<User | null>(1);
  public loading = new BehaviorSubject<boolean>(false);  // Add loading state

  constructor(private http: HttpClient) {
  }

  get user(): Observable<User | null> {
    return this._user.asObservable();
  }

  setUser(user: User | null) {
    this._user.next(user);
  }

  getUserValue(): Observable<User | null> {
    return this._user.asObservable();
  }


  loadInitialData(): Observable<any> {
    this.loading.next(true); // Set loading to true when start fetching data
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwt_decode(token) as User;
      // Assuming the decoded token structure includes user details
      if (decoded._id) {
        return this.getUserById(decoded._id).pipe(
          tap((user: User) => {
            this._user.next(user);
            this.loading.next(false); // Set loading to false when data fetching is completed
          }));
      }
    }
    this.loading.next(false); // Set loading to false when data fetching is completed
    return of(null);
  }

  // This is assuming your API returns user details upon passing valid token
  getUserById(id: string): Observable<User> {
    // Set loading to true when start fetching data
    return this.http.get<User>(`${url}/${id}`).pipe(
      tap((user: User) => {
      }, (error) => {
        console.log(error)
      })
    );
  }

  addToPeeks(userId: string, objectId: string): Observable<User> {
    return this.http.post<User>(`${url}/${userId}/peeks/`, {objectId});
  }

  refreshUser(): void {
    this.getUserValue().subscribe(user => {
      if (user) {
        this.http.get<User>(`${url}/${user._id}`).subscribe(
          refreshedUser => this._user.next(refreshedUser)
        );
      }
    });
  }

  clearUser() {
    this._user.next(null);
  }


}
