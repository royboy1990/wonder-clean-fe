import {Component, Input, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectTypesModel} from "../../../../models/select-types.model";

@Component({
  selector: 'app-wonder-select',
  templateUrl: './wonder-select.component.html',
  styleUrls: ['./wonder-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WonderSelectComponent),
    multi: true
  }]
})
export class WonderSelectComponent implements ControlValueAccessor {
  @Input() items: SelectTypesModel[] = [];
  @Input() multiple = false;

  selectedItems: SelectTypesModel[] = [];
  otherInputValue: string = '';

  private onChange = (value: any) => {
  };
  private onTouched = () => {
  };


  selectItem(selectedItem: SelectTypesModel) {
    if (this.multiple) {
      if (this.selectedItems.some(item => item.id === selectedItem.id)) {
        this.selectedItems = this.selectedItems.filter(item => item.id !== selectedItem.id);
      } else {
        this.selectedItems.push(selectedItem);
      }
    } else {
      this.selectedItems = [selectedItem];
    }

    if (this.isOtherSelected()) {
      this.onChange([]);
    } else {
      this.onChange(this.selectedItems);
    }
    this.onTouched();
  }

  onOtherInputChange(value: string) {
    this.otherInputValue = value;
    if (value.trim() !== '') {
      this.onChange([{text: value.trim(), id: null, isOther: true}]); // Set the form to be valid when there is a value
    } else {
      this.onChange(null); // Set the form to be invalid when there is no value
    }
    this.onTouched();
  }

  isSelected(item: SelectTypesModel): boolean {
    return this.selectedItems.some(selectedItem => selectedItem.id === item.id);
  }

  isOtherSelected(): boolean {
    return this.selectedItems.some(item => item.isOther);
  }

  writeValue(value: SelectTypesModel[]): void {
    if (value !== undefined) {
      this.selectedItems = value;
      const otherItem = this.selectedItems.find(item => item.isOther);
      if (otherItem) {
        this.otherInputValue = otherItem.text;
      }
    }
  }

  closeOther() {
    this.selectedItems = this.selectedItems.filter(item => !item.isOther);
    this.onChange(this.selectedItems);
    this.otherInputValue = '';
  }

  getGridColumns(): string {
    const length = this.items.length;
    if (length >= 12) return 'grid-cols-6'
    if (length <= 2) return 'grid-cols-2';
    if (length % 3 === 0) return 'grid-cols-3';
    if ([4, 7, 8].includes(length)) return 'grid-cols-4';
    if (length >= 5) return 'grid-cols-5';

    return 'grid-cols-1';
  }

  getGridRows(): string {
    return this.items.length > 5 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
