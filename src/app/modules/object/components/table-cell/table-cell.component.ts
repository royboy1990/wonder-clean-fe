import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styles: []
})
export class TableCellComponent {
  @Input() title!: string;
  @Input() data: any;

  isHovered = false;
}
