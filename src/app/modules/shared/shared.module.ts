import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCollectionComponent} from './components/user-collection/user-collection.component';
import {MatIconModule} from "@angular/material/icon";
import { HeaderComponent } from './components/header/header.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  declarations: [
    UserCollectionComponent,
    HeaderComponent
  ],
    exports: [
        UserCollectionComponent,
        HeaderComponent
    ]
})
export class SharedModule {}
