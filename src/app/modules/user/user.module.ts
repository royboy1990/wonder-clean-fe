import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {MeRoutingModule} from './me-routing.module';
import {MyCollectionComponent} from './my-collection/my-collection.component';
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";
import {MyPeeksComponent} from './my-peeks/my-peeks.component';
import {ObjectsViewerModule} from "../objects-viewer/objects-viewer.module";


@NgModule({
  declarations: [
    MyCollectionComponent,
    MyPeeksComponent
  ],
  imports: [
    CommonModule,
    MeRoutingModule,
    MatIconModule,
    SharedModule,
    ObjectsViewerModule,
    NgOptimizedImage,
  ]
})
export class UserModule {
}
