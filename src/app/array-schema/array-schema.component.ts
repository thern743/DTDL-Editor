import { Component, Input, OnInit } from '@angular/core';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { ArraySchemaFormControl } from '../formControls/schemas/ArraySchemaFormControl';
import { SchemaService } from '../services/schema/schema.service';
import { MatSelectChange } from '@angular/material/select';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';

@Component({
  selector: 'array-schema',
  templateUrl: './array-schema.component.html',
  styleUrls: ['./array-schema.component.scss']
})
export class ArraySchemaComponent implements OnInit {
  @Input()
  public array!: ArraySchemaFormControl;
  public schemaService: SchemaService;
  public panelOpenState = true;
  public schemaTypes: Array<string>;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractSchemaModel>;

  constructor(schemaService: SchemaService) {
    this.schemaService = schemaService;
    this.schemaTypes = this.getSchemaTypes();
  }

  public ngOnInit(): void {
    this.array.subscribeModelToForm(this.array.form);
  }

  private getSchemaTypes(): Array<string> {
    return this.schemaService.getSchemaTypes();
  }

  public isComplex(schema: string): boolean {
    return this.schemaService.getSchemaTypeEnum(schema) == SchemaTypeEnum.Complex;
  }

  public changeSchema($event: MatSelectChange): void {
    if ($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaType = this.schemaService.getSchemaTypeEnum(key);
    this.array.form.get("elementSchema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this.schemaService.createForm(SchemaTypeEnum[schemaType], key);
      if (formControl === undefined) return;
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    this.schemaService.openSchemaEditor(this.array.form, this.schemaFormControl)
  }
}
