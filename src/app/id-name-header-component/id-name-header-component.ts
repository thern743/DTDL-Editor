import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'id-name-header-component',
  templateUrl: './id-name-header-component.html',
  styleUrls: ['./id-name-header-component.scss']
})
export class IdNameHeaderComponent implements OnInit {
  @Input() public panelOpenState: boolean = false;
  @Input() public formIndex: number = -1;
  @Input() public formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
  
  public stopPropagation($event: Event): void {
    if(!this.panelOpenState) {
      $event.stopImmediatePropagation();
    }    
  }
}
