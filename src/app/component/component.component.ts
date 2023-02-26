import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service';
import { ComponentCapabilityFormControl } from '../formControls/ComponentCapabilityFormControl';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LocalizationFormControl } from '../formControls/LocalizationFormControl';
import { DisplayNameDescriptionLanguageMap } from '../models/DisplayNameDescriptionLanguageMap';
import { SettingsService } from '../services/settings/settings.service';
import { ValidationService } from '../services/validation/validation-service.service';

@Component({
  selector: 'component-definition',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @Input() public interfaceId!: string;
  @Input() public formIndex!: [number, number];
  @Input() public component!: ComponentCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  public displayNameDescription!: LocalizationFormControl;
  private _editorService: EditorService;

  constructor(editorService: EditorService, validationService: ValidationService, settingsService: SettingsService, formBuilder: FormBuilder, dialog: MatDialog) {
    this._editorService = editorService;
    const model = new DisplayNameDescriptionLanguageMap();
    this.displayNameDescription = new LocalizationFormControl(model, settingsService, validationService, formBuilder);
  }
  
  public ngOnInit(): void { 
    this.component.subscribeModelToForm(this.component.form);
    this.syncHeaderFields();    
  }

  public getFormControl(name: string): FormControl {
    return this.component.form.get(name) as FormControl;
  }

  public syncHeaderFields() {
    const id = this.component.form.get("id");
    const name = this.component.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
  }

  public filterInterfacesForExtends(interfaceId: string): Array<string> {
    return this._editorService.filterInterfacesForExtends(interfaceId);
  }
}
