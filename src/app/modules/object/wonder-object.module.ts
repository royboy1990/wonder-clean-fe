import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WonderObjectRoutingModule} from './wonder-object-routing.module';
import {WonderObjectComponent} from './components/object/wonder-object.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {TableCellComponent} from './components/table-cell/table-cell.component';
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";
import {CapitalizePipe} from "../../pipes/capitalize.pipe";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    WonderObjectComponent,
    TableCellComponent,
    CapitalizePipe
  ],
    imports: [
        CommonModule,
        WonderObjectRoutingModule,
        GoogleMapsModule,
        FormsModule,
        MatInputModule,
        MatSliderModule,
        ReactiveFormsModule,
        MatIconModule,
        SharedModule,
        MatTooltipModule,
    ]
})
export class WonderObjectModule {
}
