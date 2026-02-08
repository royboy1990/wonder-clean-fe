import {Route} from '@angular/router';
import {AuthGuard} from "./modules/auth/guards/auth.guard";

export const appRoutes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'add-object',
    loadChildren: () => import('./modules/add-object/add-object.module').then(m => m.AddObjectModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'object',
    loadChildren: () => import('./modules/object/wonder-object.module').then(m => m.WonderObjectModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];
