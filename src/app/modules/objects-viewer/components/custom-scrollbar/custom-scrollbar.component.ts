import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  ElementRef,
  ViewChild,
  ChangeDetectorRef, OnChanges, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-custom-scrollbar',
  templateUrl: './custom-scrollbar.component.html',
  styleUrls: ['./custom-scrollbar.component.scss']
})
export class CustomScrollbarComponent implements OnChanges {
  @Input() scrollAreaWidth = 0;
  @Input() scrollPosition = 0;
  @Output() scrollChange: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('scrollbar') scrollbar!: ElementRef;
  @ViewChild('scrollThumb') scrollThumb!: ElementRef;
  isDragging = false; // Flag to check whether we're dragging the scrollbar
  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['scrollPosition']) {
      this.scrollChange.emit(this.scrollPosition);
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.stopDragging();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const scrollbarRect = this.scrollbar.nativeElement.getBoundingClientRect();
    const scrollbarStart = scrollbarRect.left;
    const scrollbarEnd = scrollbarRect.right;

    if (event.clientX < scrollbarStart + 25 || event.clientX > scrollbarEnd - 25) {
      return;
    }

    const thumbWidthPercentage = (50 / scrollbarRect.width) * 100;
    const scrollbarRelativePosition = event.clientX - scrollbarStart;
    this.scrollPosition = (scrollbarRelativePosition / scrollbarRect.width) * 100 - thumbWidthPercentage / 2;

    this.scrollChange.emit(this.scrollPosition);
    this.cdRef.detectChanges();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.stopDragging();
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    event.stopPropagation();
  }

  get scrollLeft() {
    // Replace the calculation with scrollPosition
    return this.scrollPosition;
  }

  set scrollLeft(value: number) {
    this.scrollPosition = value;
    this.scrollChange.emit(value);  // emit the new scroll position
  }
  stopDragging() {
    this.isDragging = false;
  }

  grabScrollbar(event: MouseEvent) {
    this.isDragging = true;

    // Get scrollbar's position relative to the viewport
    const scrollbarPosition = this.scrollbar.nativeElement.getBoundingClientRect();

    // Calculate thumb width as a percentage of the scrollbar width
    const thumbWidthPercentage = (50 / scrollbarPosition.width) * 100;

    // Calculate click position relative to the scrollbar (in pixels)
    const clickPositionInPixels = event.clientX - scrollbarPosition.left;

    // Convert click position to a percentage of the scrollbar width
    const clickPositionInPercent = (clickPositionInPixels / scrollbarPosition.width) * 100;

    const scrollbarRect = this.scrollbar.nativeElement.getBoundingClientRect();
    const scrollbarStart = scrollbarRect.left;
    const scrollbarEnd = scrollbarRect.right;

    if (event.clientX < scrollbarStart + 25 || event.clientX > scrollbarEnd - 25) {
      return;
    }
    // Adjust the thumb position so that its center aligns with the click position
    this.scrollLeft = clickPositionInPercent - (thumbWidthPercentage / 2);
  }
}
