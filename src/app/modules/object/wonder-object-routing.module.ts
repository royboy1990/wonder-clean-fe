import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WonderObjectComponent} from "./components/object/wonder-object.component";

const routes: Routes = [
  {
    path: ':objectId',
    component: WonderObjectComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WonderObjectRoutingModule { }
