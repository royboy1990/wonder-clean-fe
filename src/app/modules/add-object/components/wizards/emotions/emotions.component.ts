import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EMOTIONS_TYPES} from "../../../../../constants/emotion-type.constants";
import {YES_NO_TYPES} from "../../../../../constants/yes-no.constants";
import {USAGE_TYPES} from "../../../../../constants/usage-type.constants";

@Component({
  selector: 'app-emotions',
  templateUrl: './emotions.component.html',
  styleUrls: ['./emotions.component.scss']
})
export class EmotionsComponent implements OnInit {
  readonly steps = ['emotionsCtrl', 'lostItemCtrl', 'isRelicCtrl', 'isReplaceableCtrl', 'isIntendedUseCtrl', 'usageCtrl'];
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  emotionTypes = EMOTIONS_TYPES;
  usageTypes = USAGE_TYPES;
  yesNoTypes = YES_NO_TYPES;

  currentStepIndex = 0;
  formSteps!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formSteps = this.formBuilder.group({
      emotionsCtrl: [[], Validators.required],
      lostItemCtrl: [[], Validators.required],
      isRelicCtrl: [[], Validators.required],
      isReplaceableCtrl: [[], Validators.required],
      isIntendedUseCtrl: [[], Validators.required],
      usageCtrl: [[], Validators.required],
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
