import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment as env} from "../../../environments/environment";
import {User} from "../../models/user.model";
import {WonderObject} from "../../models/object.model";
import {tap} from "rxjs/operators";

const url = `${env.apiUrl}/objects`;

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  private objectUpdateSubject = new Subject<string>(); // New

  constructor(private http: HttpClient) {
  }

  getObjectUpdateObservable(): Observable<string> { // New
    return this.objectUpdateSubject.asObservable();
  }

  addObject(object: WonderObject, user: User | null): Observable<WonderObject> {
    return this.http.post<WonderObject>(`${url}`, {object, user});
  }

  getObject(id: string): Observable<WonderObject> {
    return this.http.get<WonderObject>(`${url}/${id}`)
  }

  getObjects(userId?: string): Observable<WonderObject[]> {
    const endpoint = userId ? `${url}/all/${userId}` : `${url}`;
    return this.http.get<WonderObject[]>(`${endpoint}`);
  }

  getObjectsGroupedBy(field: string, userId?: string): Observable<any> {
    const endpoint = userId ? `${url}/grouped/${field}/${userId}` : `${url}/grouped/${field}`;
    return this.http.get(`${endpoint}`);
  }

  updateObject(object: WonderObject): Observable<WonderObject> {
    return this.http.put<WonderObject>(`${url}/${object._id}`, object).pipe(
      tap((updatedObject: WonderObject) => {
        this.objectUpdateSubject.next(updatedObject._id); // New
      })
    );
  }

  deleteObject(id: string | undefined): Observable<WonderObject> {
    return this.http.delete<WonderObject>(`${url}/${id}`);
  }

  checkImageURL(URL: string): Observable<boolean> {
    return this.http.get(URL, {observe: 'response'}).pipe(
      map(res => true),
      catchError((error) => of(false))
    );
  }
}
