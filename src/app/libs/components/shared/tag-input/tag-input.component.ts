import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {

  @Input() value: string[];

  @Output() valueChange = new EventEmitter<string[]>();


  constructor() { }

  ngOnInit(): void {
  }

  onValueChange() {
    this.valueChange.emit(this.value);
  }

}
