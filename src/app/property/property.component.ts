import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';

@Component({
  selector: 'property-definition',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public property!: PropertyCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  public dialog: MatDialog;

  constructor(dialog: MatDialog) {
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this.property.subscribeModelToForm(this.property.form);
    this.syncHeaderFields();
  }

  public syncHeaderFields() {
    const id = this.property.form.get("id");
    const name = this.property.form.get("name");

    id?.valueChanges.subscribe(value => {
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });
  }
}
