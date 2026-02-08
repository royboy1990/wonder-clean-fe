import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EMOTIONS_TYPES} from "../../../../../constants/emotion-type.constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {YES_NO_TYPES} from "../../../../../constants/yes-no.constants";

@Component({
  selector: 'app-monetary',
  templateUrl: './monetary.component.html',
  styleUrls: ['./monetary.component.scss']
})
export class MonetaryComponent implements OnInit {
  readonly steps = ['priceCtrl', 'isSellableCtrl'];
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  currentStepIndex = 0;
  formSteps!: FormGroup;

  yesNoTypes = YES_NO_TYPES;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formSteps = this.formBuilder.group({
      priceCtrl: [[], Validators.required],
      isSellableCtrl: [[], Validators.required],
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
