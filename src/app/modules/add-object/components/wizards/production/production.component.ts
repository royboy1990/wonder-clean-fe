import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PRODUCTION_TYPES} from "../../../../../constants/proudction-type.constants";
import {EDITION_TYPES} from "../../../../../constants/edition-type.constants";

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent {
  readonly steps = ['productionTypeCtrl', 'creatorCtrl', 'editionCtrl'];
  productionTypes = PRODUCTION_TYPES;
  editionTypes = EDITION_TYPES;

  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  currentStepIndex = 0;
  formSteps!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.formSteps = this.formBuilder.group({
      productionTypeCtrl: [[], Validators.required],
      creatorCtrl: ['', Validators.required],
      editionCtrl: [[], Validators.required],
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
