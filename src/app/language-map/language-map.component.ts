import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'language-map',
  templateUrl: './language-map.component.html',
  styleUrls: ['./language-map.component.scss']
})
export class LanguageMapComponent implements OnInit {
  @Input() public id!: string;
  @Input() public labelText!: string;
  @Input() public control!: FormControl;
  @Input() public formControlName!: string;
  @Input() public style: string = "width: 200px";

  constructor() { 
  }

  public ngOnInit(): void {
  }
}
