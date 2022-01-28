import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service'
import { ValidationService } from '../services/validation/validation-service.service';
import { CommandCapabilityFormControl } from '../formControls/CommandCapabilityFormControl';


@Component({
  selector: 'command-definition',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public command!: CommandCapabilityFormControl;
  @Input() public panelOpenState!: boolean;

  public editorService: EditorService;
  private _validationService: ValidationService;

  constructor(editorService: EditorService, validationService: ValidationService) { 
    this.editorService = editorService;
    this._validationService = validationService;
  }

  public ngOnInit(): void {  
    this.command.subscribeModelToForm();
    this.syncHeaderFields();    
  }

  public syncHeaderFields() {
    const id = this.command.form.get("id");
    const name = this.command.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
  }
}
