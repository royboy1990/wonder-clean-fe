import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ObjectService} from "../../../../services/object/object.service";
import {WonderObject} from "../../../../models/object.model";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ACQUISITION_TYPES} from "../../../../constants/acquisition-type.constants";
import {PRODUCTION_TYPES} from "../../../../constants/proudction-type.constants";
import {HAND_STATUS_TYPES} from "../../../../constants/hand-status-type.constants";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  private subscription: Subscription[] = [];
  @ViewChildren('gridElement') gridElements!: QueryList<ElementRef>;
  @ViewChild('scrollableElement') scrollableElement!: ElementRef;
  @ViewChild('appFilter', {read: ElementRef}) appFilter!: ElementRef;
  @Output() scrollPastFilter = new EventEmitter<boolean>();
  @Input() userId!: string;

  scrollPosition = 0;
  scrollAreaWidth = 1200; // You should calculate this based on your layout's content
  isFolderImage = false;
  objects: WonderObject[] = [];
  groupedObjects: {
    groupName: string, objects: WonderObject[]
  }[] = [];
  selectedFilter: { text: string, path: string } = {text: 'All', path: ''};
  currentGroup: string = '';
  objectsForCurrentGroup: WonderObject[] = [];
  currentGroupIndex = 0;
  hoveredGroupName: string | null = null;

  constructor(private objectsService: ObjectService, public router: Router, private cdr: ChangeDetectorRef) {
    window.addEventListener('scroll', () => {
      if(this.selectedFilter.text !== 'All'){
        this.scrollPastFilter.emit(this.isInViewport());
      }
    }, true); //third parameter

  }

  ngOnInit() {
    this.objectsService.getObjects(this.userId).subscribe((objects: WonderObject[]) => {
      this.objects = objects;
    });
  }


  ngAfterViewInit() {
    this.subscription.push(this.gridElements.changes.subscribe(() => {
      if (this.selectedFilter.text !== 'All') {
        this.calculateScrollAreaWidth();
        this.scrollableElement.nativeElement.scrollLeft = 1;  // Add this line
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }


  isInViewport(): boolean {
    const rect = this.appFilter.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  calculateScrollAreaWidth() {
    // calculate scrollAreaWidth based on the actual width of the content

    this.scrollAreaWidth = this.scrollableElement?.nativeElement.scrollWidth;
  }

  setScrollPosition(position: number) {
    const scrollableContent = this.scrollableElement.nativeElement;
    const maxScrollLeft = scrollableContent.scrollWidth - scrollableContent.clientWidth;
    scrollableContent.scrollLeft = (position / 100) * maxScrollLeft;
  }


  onFilterChange(value: { text: string, path: string }) {
    // call the grouped endpoint only when the filter is not 'All'
    if (value.text !== 'All') {
      this.objectsService.getObjectsGroupedBy(value.path, this.userId).subscribe((groups) => {
        groups.forEach((group: {
          groupName: string[] | string;
        }) => {
          if (group?.groupName instanceof Array) {
            group.groupName = group.groupName[0];
          }
          if (!group.groupName) {
            group.groupName = '';
          }
        });
        this.groupedObjects = groups;
        this.selectedFilter = value;
        this.isFolderImage = ['location', 'material', 'years', 'value status'].includes(this.selectedFilter.text.toLowerCase());
        this.selectGroup(this.groupedObjects[0].groupName);
        if (this.isInViewport()) {
          this.scrollPastFilter.emit(true);
        }
        this.cdr.detectChanges();
        this.calculateScrollAreaWidth();

      });
    } else {
      // call the regular endpoint to get all objects ungrouped when the filter is 'All'
      this.objectsService.getObjects(this.userId).subscribe((objects: WonderObject[]) => {
        this.objects = objects;
        this.selectedFilter = value;
        this.scrollPastFilter.emit(false);
        this.cdr.detectChanges();
      });
    }
  }

  getBackground(group: any): string {
    let groupName = group.groupName;


    let iconsFolder = 'assets/images/icons'
    let folder: string = ''
    let formattedGroupName = '';

    formattedGroupName = groupName.toString().toLowerCase().replaceAll(' ', '_')
    switch (this.selectedFilter.text.toLowerCase()) {
      case 'all':
        folder = '';
        break;
      case 'acquisition methods':
        folder = 'acquisition';
        if (groupName.toLowerCase() === 'i bought it') {
          formattedGroupName = '1'
        }
        if (groupName.toLowerCase() === 'i received it as a present') {
          formattedGroupName = '2'
        }
        if (groupName.toLowerCase() === 'i found it') {
          formattedGroupName = '3'
        }
        if (groupName.toLowerCase() === 'i inherited it') {
          formattedGroupName = '4'
        }
        if (groupName.toLowerCase() === 'i got it in exchange') {
          formattedGroupName = '5'
        }
        if (groupName.toLowerCase() === 'i stole it') {
          formattedGroupName = '6'
        }

        break;
      case 'years':
        folder = 'year';
        formattedGroupName = 'year'
        break;
      case 'production status':
        folder = 'production';
        if (['big factory manufacturer', 'small factory manufacturer'].includes(groupName.toLowerCase())) {
          formattedGroupName = '1';
        }
        if (groupName.toLowerCase() === 'personal production') {
          formattedGroupName = '2';
        }
        if (groupName.toLowerCase() === 'handmade') {
          formattedGroupName = '3';
        }
        if (groupName.toLowerCase() === 'mass market') {
          formattedGroupName = '4';
        }
        if (groupName.toLowerCase() === 'limited_edition') {
          formattedGroupName = '5';
        }
        return `${iconsFolder}/${folder}/sm/${formattedGroupName.toLowerCase()}.png`;
      case 'hand status':
        folder = 'hand-status';
        if (groupName.toLowerCase() === 'first hand') {
          formattedGroupName = '1';
        }
        if (groupName.toLowerCase() === 'second hand') {
          formattedGroupName = '2';
        }
        if (groupName.toLowerCase() === 'third hand') {
          formattedGroupName = '3';
        }
        if (groupName.toLowerCase() === 'fourth hand') {
          formattedGroupName = '4';
        }
        if (groupName.toLowerCase() === 'fifth hand') {
          formattedGroupName = '5';
        }
        break;
      default:
        folder = this.selectedFilter.text.toLowerCase();
        break;
    }
    return `${iconsFolder}/${folder}/sm/${formattedGroupName.toLowerCase()}.png`;
  }

  isGroupImage(group: any): boolean {
    let groupName = group.groupName;
    switch (this.selectedFilter.text.toLowerCase()) {
      case 'all':
      case 'location':
      case 'material':
      case 'years':
      case 'value status':
        return false;
      case 'acquisition methods':
        return ACQUISITION_TYPES.some(item => item.text.toLowerCase() === groupName.toLowerCase());
      case 'production status':
        return PRODUCTION_TYPES.some(item => item.text.toLowerCase() === groupName.toLowerCase());
      case 'hand status':
        return HAND_STATUS_TYPES.some(item => item.text.toLowerCase() === groupName.toLowerCase());
      default:
        return true;
    }
  }

  onMouseEnter(groupName: string) {
    this.hoveredGroupName = groupName;
  }

  onMouseLeave(groupName: string) {
    this.hoveredGroupName = null;
  }

  selectGroup(groupName: string) {
    this.currentGroup = groupName;
    this.currentGroupIndex = this.groupedObjects.findIndex(group => group.groupName === groupName)

    // @ts-ignore
    this.objectsForCurrentGroup = this.groupedObjects.find(group => group.groupName === groupName).objects;
  }

  getTransformStyle(i: number, isHovered = false): string {
    // Adjust the base and factor values as necessary
    const base = 30; // Base translation value in pixels
    const factor = 40; // Pixels to translate per index
    let translation = 0;
    translation -= i * factor;
    if (isHovered) {
      translation -= base;
    }
    return `translateY(${translation}px)`;
  }
}
