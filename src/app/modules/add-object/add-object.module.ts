import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {AddObjectRoutingModule} from './add-object-routing.module';
import {WizardComponent} from './components/wizard/wizard.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BasicComponent} from './components/wizards/basic/basic.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ValueComponent } from './components/wizards/value/value.component';
import {MatSliderModule} from "@angular/material/slider";
import { ProductionComponent } from './components/wizards/production/production.component';
import { WonderSelectComponent } from './components/wonder-select/wonder-select.component';
import { HistoryComponent } from './components/wizards/history/history.component';
import { EmotionsComponent } from './components/wizards/emotions/emotions.component';
import { MonetaryComponent } from './components/wizards/monetary/monetary.component';
import { DescriptionComponent } from './components/wizards/description/description.component';
import { PublicStatusComponent } from './components/wizards/public-status/public-status.component';
import { ValueCheckComponent } from './components/wizards/value-check/value-check.component';
import {SharedModule} from "../shared/shared.module";
import { VideoDoneComponent } from './components/video-done/video-done.component';


@NgModule({
  declarations: [
    WizardComponent,
    BasicComponent,
    ValueComponent,
    ProductionComponent,
    WonderSelectComponent,
    HistoryComponent,
    EmotionsComponent,
    MonetaryComponent,
    DescriptionComponent,
    PublicStatusComponent,
    ValueCheckComponent,
    VideoDoneComponent,
  ],
    imports: [
        CommonModule,
        AddObjectRoutingModule,
        MatStepperModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        NgOptimizedImage,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSliderModule,
        SharedModule,
    ]
})
export class AddObjectModule {
}
