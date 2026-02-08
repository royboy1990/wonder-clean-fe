import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImageUploadService} from "../../../../../services/image-upload/image-upload.service";
import {HAND_STATUS_TYPES} from "../../../../../constants/hand-status-type.constants";
import {ACQUISITION_TYPES} from "../../../../../constants/acquisition-type.constants";
import {YES_NO_TYPES} from "../../../../../constants/yes-no.constants";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input() mainFormGroup!: FormGroup;
  readonly steps = ['acquisitionMethodCtrl', 'dreamObjectCtrl', 'handStatusCtrl', 'pastOwnersCtrl', 'damageCtrl', 'damageImagesCtrl'];

  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  currentStepIndex = 0;
  formSteps!: FormGroup;

  imagePreviews: any[] = [];
  isUploading = false;
  imagePaths: string[] = [];

  acquisitionTypes = ACQUISITION_TYPES;
  yesNoTypes = YES_NO_TYPES;
  handStatusTypes = HAND_STATUS_TYPES;

  constructor(private formBuilder: FormBuilder, private imageUploadService: ImageUploadService) {
  }


  ngOnInit() {
    this.formSteps = this.formBuilder.group({
      acquisitionMethodCtrl: [[], Validators.required],
      dreamObjectCtrl: [[], Validators.required],
      handStatusCtrl: [[], Validators.required],
      pastOwnersCtrl: [null, Validators.required],
      damageCtrl: [],
      damageImagesCtrl: [[]],
    });
  }

  // Image
  onImageSelected(event: Event) {
    if (this.imagePaths.length >= 4) {
      return;
    }
    // @ts-ignore
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length) {
      // Start the upload for each file
      const filesArray = Array.from(files);
      filesArray.forEach(file => {
        // Show a preview of the image
        const reader = new FileReader();
        reader.onload = e => this.imagePreviews.push(reader.result);
        reader.readAsDataURL(file);
      });

      // Start the upload
      this.startImageUpload(filesArray);
    }
  }


  startImageUpload(files: File[]) {
    this.isUploading = true;

    this.imageUploadService.uploadImages(files).subscribe(
      (response) => {
        this.isUploading = false;

        response.forEach((fileInfo: any) => {
          this.imagePaths.push(fileInfo.path);
        });

        this.formSteps.get('damageImagesCtrl')?.setValue(this.imagePaths);

        // handle response
      },
      (error) => {
        console.log('Image upload failed');
        console.log(error)
        // handle error
      }
    );
  }

  next(): void {
    // Get the name of the control for the current step.
    const controlName = this.steps[this.currentStepIndex];

    // Check if the current control is valid.
    if (this.formSteps.get(controlName)?.valid) {
      // here we are doing -2 because we have 2 ctrls in the same page
      if (this.currentStepIndex < this.steps.length - 2) {
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
