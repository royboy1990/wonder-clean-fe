import {Injectable} from '@angular/core';
import {environment as env} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = `${env.apiUrl}/objects/images`;

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private httpClient: HttpClient) {
  }

  uploadImages(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file, file.name);
    });
    return this.httpClient.post(`${url}`, formData);
  }

  deleteImage(imagePath: string): Observable<any> {
    const encodedPath = encodeURIComponent(imagePath);
    return this.httpClient.delete(`${url}/${encodedPath}`);
  }

}
