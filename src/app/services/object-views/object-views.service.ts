import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ObjectViewsService {
  constructor(private router: Router) {
  }

  private _viewCount: number = 0;

  incrementViewCount() {
    this._viewCount += 1;

    if (this._viewCount >= 3) {
      this.router.navigate(['/auth/register']);
    }
  }
}
