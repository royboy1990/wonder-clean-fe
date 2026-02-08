import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HIDE_SHOW_TYPES} from "../../../../../constants/hide-show.constants";

@Component({
  selector: 'app-public-status',
  templateUrl: './public-status.component.html',
  styleUrls: ['./public-status.component.scss']
})
export class PublicStatusComponent implements OnInit {
  readonly steps = ['publicStatusCtrl'];
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  currentStepIndex = 0;
  formSteps!: FormGroup;

  hideShowTypes = HIDE_SHOW_TYPES

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formSteps = this.formBuilder.group({
      publicStatusCtrl: [[], Validators.required],
    });
  }


  next(): void {
    // Get the name of the control for the current step.
    const controlName = this.steps[this.currentStepIndex];

    // Check if the current control is valid.
    if (this.formSteps.get(controlName)?.valid) {
      if (this.currentStepIndex < this.steps.length - 1) {
        // If there are more steps, go to the next step.
        this.currentStepIndex++;
      } else {
        // If this was the last step, emit the nextStep event.
        this.nextStep.emit(this.formSteps.value);
      }
    }
  }

  previous(): void {
    // If we're not at the first step, go back.
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    } else {
      // Otherwise, emit the previousStep event.
      this.prevStep.emit();
    }
  }

}
