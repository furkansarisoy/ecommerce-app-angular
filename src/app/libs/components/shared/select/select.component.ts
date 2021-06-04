import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SelectOptions {
  key: string;
  value: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() value: string[];
  @Input() options: SelectOptions[];

  @Output() valueChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onValueChange() {
    this.valueChange.emit(this.value);
  }

}
