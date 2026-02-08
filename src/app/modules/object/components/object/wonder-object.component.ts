import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ObjectService} from "../../../../services/object/object.service";
import {WonderObject} from "../../../../models/object.model";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../models/user.model";
import {Subscription} from "rxjs";
import {SelectTypesModel} from "../../../../models/select-types.model";
import {ACQUISITION_TYPES} from "../../../../constants/acquisition-type.constants";
import {HAND_STATUS_TYPES} from "../../../../constants/hand-status-type.constants";
import {PRODUCTION_TYPES} from "../../../../constants/proudction-type.constants";

@Component({
  selector: 'app-object',
  templateUrl: './wonder-object.component.html',
  styleUrls: ['./wonder-object.component.scss']
})
export class WonderObjectComponent implements OnInit, OnDestroy {
  private routeSub: any; // to store the subscription and clean it up later
  private subscription: Subscription[] = []

  object!: WonderObject;
  user!: User | null;
  center!: google.maps.LatLngLiteral;
  zoom = 5;
  isSliderVisible = false;
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    zoomControl: true,
    scrollwheel: false,
    fullscreenControl: false,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    streetViewControl: false,
    maxZoom: 15,
    minZoom: 8,
    zoom: 5,
    styles: [
      {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {"saturation": -100},
          {"lightness": 50},
        ]
      }
    ]
  };
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  lastLocation!: any;
  objectOwner: any;

  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectService,
    private userService: UserService,
  ) {

    this.subscription.push(this.userService.user.subscribe(res => {
      this.user = res;
    }));
    this.subscription.push(this.objectService.getObjectUpdateObservable().subscribe((objectId: string) => {
      if (this.object && this.object._id === objectId) {
        this.getObject(objectId);
      }
    }))

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const objectId = params['objectId'];
      this.getObject(objectId)
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.subscription.forEach(sub => sub.unsubscribe())
  }

  checkIfIcon(itemText: string, array: SelectTypesModel[]): boolean {
    // ACQUISITION_TYPES.some((item) => item.text.toLowerCase() === groupName.toLowerCase());
    return array.some((item) => item.text.toLowerCase() === itemText.toLowerCase());
  }

  getObject(objectId: string): void {
    this.objectService.getObject(objectId).subscribe(
      (object: WonderObject) => {
        this.object = object;
        this.lastLocation = this.object.basic.locationCtrl[0];
        this.userService.getUserById(this.object.ownership).subscribe(res => {
          this.objectOwner = res;
        })

        if (this.lastLocation?.location) {
          this.center = {
            lat: this.lastLocation.location.lat,
            lng: this.lastLocation.location.lng
          };
        } else {
          this.center = {
            lat: 0,
            lng: 0
          }
        }
      },
      (err: any) => console.error(err)
    );
  }

  getLabelPosition(value: number): string {
    return `calc(${value}%)`;
  }

  showSlider(): void {
    this.isSliderVisible = true;
  }

  hideSlider(): void {
    this.isSliderVisible = false;
  }

  scrollTop() {
    setTimeout(() => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, 20);
  }

  protected readonly ACQUISITION_TYPES = ACQUISITION_TYPES;
  protected readonly HAND_STATUS_TYPES = HAND_STATUS_TYPES;
  protected readonly PRODUCTION_TYPES = PRODUCTION_TYPES;
}
