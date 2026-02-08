import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ImageUploadService} from "../../../../../services/image-upload/image-upload.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {NextAbleComponent} from "../../../../../interfaces/nextable.interface";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, AfterViewInit, NextAbleComponent {
  readonly steps = ['imageUploadCtrl', 'nameCtrl', 'materialCtrl', 'locationCtrl', 'yearCtrl'];

  @ViewChild('materialInput') materialInput!: ElementRef<HTMLInputElement>;
  @ViewChild('locationInput') locationInput: any;

  @Output() nextStep = new EventEmitter<any>();


  currentStepIndex = 0;
  formSteps!: FormGroup;

  previewImage: any = null;
  isLoading = false;
  imagePaths: string[] = [];


  materials: string[] = ['wood', 'metal', 'glass', 'plastic'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  materialCtrl = new FormControl('');
  filteredMaterials!: Observable<string[]>;
  selectedLocation: any;  // Add this to your class properties

  constructor(private formBuilder: FormBuilder, private imageUploadService: ImageUploadService, private cdRef: ChangeDetectorRef // Add this
  ) {
  }

  ngOnInit(): void {
    // Add to array.
    this.formSteps = this.formBuilder.group({
      imageUploadCtrl: ['value', Validators.required],
      nameCtrl: ['', Validators.required],
      materialCtrl: [[], Validators.required],
      locationCtrl: [[], Validators.required],
      yearCtrl: ['', Validators.required],
    });


    // Create the filteredMaterials observable for the autocomplete suggestions.
    this.filteredMaterials = this.materialCtrl.valueChanges.pipe(
      startWith(null),
      map((material: string | null) => material ? this._filter(material) : this.materials.slice())
    );
  }

  ngAfterViewInit() {
    this.initializeMap();
  }


  initializeMap() {
    const autocomplete = new google.maps.places.Autocomplete(this.locationInput.nativeElement,
      {
        // componentRestrictions: { country: 'US' },
        types: ['geocode']  // 'establishment' / 'address' / 'geocode'
      });


    google.maps.event.addListener(autocomplete, 'place_changed', () => {

      const place = autocomplete.getPlace();
      if (place.place_id && place.formatted_address) {
        this.selectedLocation = {
          formatted_address: place.formatted_address,
          place_id: place.place_id,
          location: {
            lat: place.geometry?.location?.lat(),
            lng: place.geometry?.location?.lng()
          },
        };
        this.formSteps.get('locationCtrl')?.setValue([this.selectedLocation.formatted_address]);
        this.cdRef.detectChanges();
      }
    });
  }

  // Add this method
  onLocationInput() {
    this.formSteps.get('locationCtrl')?.reset();
  }

  // Image
  onImageSelected(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      // Show a preview of the image
      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result;
      reader.readAsDataURL(file);

      // Start the upload
      this.startImagesUpload([file]);
    }
  }

  startImagesUpload(files: File[]) {
    this.isLoading = true;
    this.imageUploadService.uploadImages(files).subscribe(
      (response) => {
        this.isLoading = false;
        this.imagePaths = response.map((res: any) => res.path);
        this.formSteps.get('imageUploadCtrl')?.setValue(this.imagePaths[0]);
        this.cdRef.detectChanges();

        // handle response
      },
      (error) => {
        console.log('Image upload failed');
        console.log(error);
        this.isLoading = false;
        // handle error
      }
    );
  }

  // Material
  remove(material: string): void {
    let currentForm = this.formSteps;
    let materials = currentForm.get('materialCtrl')?.value;
    const index = materials.indexOf(material);

    if (index >= 0) {
      materials.splice(index, 1);
      currentForm.get('materialCtrl')?.setValue(materials);
    }
  }

  deleteImage(path: string) {
    this.isLoading = true;
    // assuming your image service has a delete method
    this.imageUploadService.deleteImage(path)
      .subscribe(() => {
        this.imagePaths = [];
        this.formSteps.get('imageUploadCtrl')?.reset();
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
        console.log(error);
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toLowerCase();
    let currentForm = this.formSteps;
    let materials = currentForm.get('materialCtrl')?.value;
    // Add our material
    if (value && !materials.includes(value)) {
      materials.push(value);
      currentForm.get('materialCtrl')?.setValue(materials);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.materialCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue.toLowerCase();
    let currentForm = this.formSteps;
    let materials = currentForm.get('materialCtrl')?.value;
    if (value && !materials.includes(value)) {
      materials.push(value);
      currentForm.get('materialCtrl')?.setValue(materials);
    }
    this.materialInput.nativeElement.value = '';
    this.materialCtrl.setValue(null);
  }

  //   Global
  next(): void {
    // Get the name of the control for the current step.
    const controlName = this.steps[this.currentStepIndex];

    // Check if the current control is valid.
    if (this.formSteps.get(controlName)?.valid) {
      if (this.currentStepIndex < this.steps.length - 1) {
        // If there are more steps, go to the next step.
        this.currentStepIndex++;
        this.cdRef.detectChanges();
        console.log(this.currentStepIndex)
      } else {
        // If this was the last step, emit the nextStep event.
        this.formSteps.get('locationCtrl')?.setValue([this.selectedLocation] || []);
        console.log('emitting')
        this.nextStep.emit(this.formSteps.value);
      }
    }
  }

  previous(): void {
    // If we're not at the first step, go back.
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.materials.filter(material => material.toLowerCase().includes(filterValue));
  }
}
