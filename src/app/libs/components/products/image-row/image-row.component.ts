import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-row',
  templateUrl: './image-row.component.html',
  styleUrls: ['./image-row.component.scss']
})
export class ImageRowComponent implements OnInit {

  @Input() data: Array<{ value: string }> = [];

  @Output() valueChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
    if (this.data.length < 1) {
      this.addField();
    }
  }

  addField(): void {
    const field = {
      value: ''
    };
    this.data = [
      ...this.data,
      field
    ];
  }

  removeField(index) {
    if (this.data.length > 1) {
      this.data.splice(index, 1);
      this.onValueChange();
    }
  }

  onValueChange() {
    const values = this.data.map(item => item.value);
    this.valueChange.emit(values);
  }

}
