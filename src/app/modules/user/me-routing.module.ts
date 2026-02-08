import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyCollectionComponent} from "./my-collection/my-collection.component";
import {MyPeeksComponent} from "./my-peeks/my-peeks.component";

const routes: Routes = [
  {
    path: 'peeks/:id',
    component: MyPeeksComponent
  },
  {
    path: 'collection/:id',
    component: MyCollectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule {
}
