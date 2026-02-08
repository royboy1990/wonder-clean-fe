import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from './components/filter/filter.component';
import {LayoutComponent} from './components/layout/layout.component';
import {SharedModule} from "../shared/shared.module";
import { CustomScrollbarComponent } from './components/custom-scrollbar/custom-scrollbar.component';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    FilterComponent,
    LayoutComponent,
    CustomScrollbarComponent,
    CustomScrollbarComponent
  ],
  exports: [
    LayoutComponent,
    CustomScrollbarComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MatTooltipModule,
    ]
})
export class ObjectsViewerModule {
}
