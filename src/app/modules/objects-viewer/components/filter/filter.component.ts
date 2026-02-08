import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements AfterViewInit {
  filters: { text: string, path: string }[] = [
    {text: 'All', path: ''},
    {text: 'Years', path: 'basic.yearCtrl'},
    {text: 'Location', path: 'basic.locationCtrl'},
    {text: 'Acquisition Methods', path: 'history.acquisitionMethodCtrl.text'},
    {text: 'Production Status', path: 'production.productionTypeCtrl.text'},
    {text: 'Value Status', path: 'value.valueCtrl'},
    {text: 'Hand Status', path: 'history.handStatusCtrl.text'},
    {text: 'Emotions', path: 'emotions.emotionsCtrl'},
    {text: 'Material', path: 'basic.materialCtrl'},
  ];
  @Output() selectedFilterChange = new EventEmitter<{ text: string, path: string }>();
  @Input() selectedFilter!: { text: string, path: string };

  stickyPoint = 0; // Adjust this value as needed

  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  ngAfterViewInit() {
    // calculate stickyPoint 50px before the filter gets out of view
    window.onload = () => {
      this.stickyPoint = this.el.nativeElement.offsetTop - 50;
    };
  }

  onFilterClick(filter: { text: string, path: string }) {
    this.selectedFilter = filter;
    this.selectedFilterChange.emit(filter);
  }
}
