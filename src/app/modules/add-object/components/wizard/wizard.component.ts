import {AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {BasicComponent} from "../wizards/basic/basic.component";
import {ObjectService} from "../../../../services/object/object.service";
import {UserService} from "../../../../services/user/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../../../models/user.model";
import {WonderObject} from "../../../../models/object.model";

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent {
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild(BasicComponent) basicComponent!: BasicComponent;
  private subscription: Subscription;  // Keep track of the subscription
  user: User | null = null;
  createdObject!: WonderObject;


  objectImage!: string;
  mainFormGroup: FormGroup = this.formBuilder.group({
    basic: this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      imageUploadCtrl: ['', Validators.required],
      materialCtrl: [[], Validators.required],
      locationCtrl: [[], Validators.required],
      yearCtrl: ['', Validators.required],
    }),
    value: this.formBuilder.group({
      valueCtrl: ['', Validators.required],
    }),
    production: this.formBuilder.group({
      productionTypeCtrl: [[], Validators.required],
      creatorCtrl: ['', Validators.required],
      editionCtrl: [[], Validators.required],
    }),
    history: this.formBuilder.group({
      acquisitionMethodCtrl: [[], Validators.required],
      dreamObjectCtrl: [[], Validators.required],
      handStatusCtrl: [[], Validators.required],
      damageCtrl: [''],
      damageImagesCtrl: [[]],
      pastOwnersCtrl: ['', Validators.required],
    }),
    emotions: this.formBuilder.group({
      emotionsCtrl: [[], Validators.required],
      lostItemCtrl: ['', Validators.required],
      isRelicCtrl: [[], Validators.required],
      isReplaceableCtrl: [[], Validators.required],
      isIntendedUseCtrl: [[], Validators.required],
      usageCtrl: [[], Validators.required],
    }),
    monetary: this.formBuilder.group({
      priceCtrl: ['', Validators.required],
      isSellableCtrl: [[], Validators.required],
    }),
    description: this.formBuilder.group({
      descriptionCtrl: ['', [Validators.required]],
    }),
    publicStatus: this.formBuilder.group({
      publicStatusCtrl: [[], Validators.required],
    }),
    valueCheck: this.formBuilder.group({
      valueCheckCtrl: ['', Validators.required],
    }),
  });

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    // your logic here...
    const buttons = this.el.nativeElement.querySelectorAll('.next-button');
    const currentButton = buttons[this.stepper.selectedIndex];
    console.log(currentButton);
    if (currentButton) {
      // Trigger the click event on the button
      currentButton.click();
    }
  }

  constructor(public router: Router, private formBuilder: FormBuilder, private objectService: ObjectService, private userService: UserService, private renderer: Renderer2, private el: ElementRef) {
    this.subscription = this.userService.user.subscribe(res => {
      this.user = res;
    });
  }


  onNextStep(data: any, step: string): void {
    this.mainFormGroup.controls[step].setValue(data);
    this.stepper.next();
    if (step === 'basic') {
      this.objectImage = this.mainFormGroup.value[step].imageUploadCtrl[0];
    }

    if (step === 'valueCheck') {
      this.objectService.addObject(this.mainFormGroup.value, this.user).subscribe((res) => {
        this.createdObject = res;
        this.userService.refreshUser();
        this.router.navigate(['add-object/done'], {queryParams: {object: JSON.stringify(this.createdObject)}});
      });
    }
  }

  onPrevStep(): void {
    this.stepper.previous();
  }
}
