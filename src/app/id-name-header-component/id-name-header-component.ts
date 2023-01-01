import { Component, Input, OnInit } from '@angular/core';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';

@Component({
  selector: 'id-name-header-component',
  templateUrl: './id-name-header-component.html',
  styleUrls: ['./id-name-header-component.scss']
})
export class IdNameHeaderComponent implements OnInit {
  @Input() public panelOpenState: boolean = false;
  @Input() public formIndex: number = -1;
  @Input() public formGroupControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;

  constructor() { }

  public ngOnInit(): void {
  }
  
  public stopPropagation($event: Event): void {    
    $event.stopImmediatePropagation();    
  }
}
