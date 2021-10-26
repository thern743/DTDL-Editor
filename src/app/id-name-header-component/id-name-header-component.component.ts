import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'id-name-header-component',
  templateUrl: './id-name-header-component.component.html',
  styleUrls: ['./id-name-header-component.component.scss']
})
export class IdNameHeaderComponentComponent implements OnInit {
  @Input() public formIndex: number = -1;
  @Input() public formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
