import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WizardComponent} from "./components/wizard/wizard.component";
import {VideoDoneComponent} from "./components/video-done/video-done.component";

const routes: Routes = [
  {
    path: '',
    component: WizardComponent
  },
  {
    path: 'done',
    component: VideoDoneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddObjectRoutingModule {
}
