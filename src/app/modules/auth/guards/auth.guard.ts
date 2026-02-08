import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {UserService} from "../../../services/user/user.service";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const currentTime = Date.now().valueOf() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token expired.");
        localStorage.removeItem('accessToken');
        this.userService.clearUser()
        this.router.navigate(['/auth/login']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/auth/login']);
      localStorage.removeItem('accessToken');
      this.userService.clearUser()
      return false;
    }
  }

}
