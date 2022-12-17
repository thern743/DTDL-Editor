import { Component, Input, OnInit } from '@angular/core';
import { JsonTypes, TypedJSON } from 'typedjson';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { FileService } from '../services/file/file-service.service';

@Component({
  selector: 'preview-panel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.scss']
})
export class PreviewPanelComponent implements OnInit {
  public panelOpenState = false;
  @Input() public formIndex: number = 0;
  @Input() public interface!: InterfaceCapabilityFormControl;
  @Input('cdkCopyToClipboard') public text!: string
  public fileService: FileService;
  private _typedJson: TypedJSON<InterfaceCapabilityModel>;

  constructor(fileService: FileService) { 
    this.fileService = fileService;
    this._typedJson = new TypedJSON(InterfaceCapabilityModel, { preserveNull: true });
  }

  public ngOnInit(): void {
    
  }

  // TODO: Determine why TypedJSON isn't working properly.
  public getJsonLd() : any {
    //let str = this._typedJson.stringify(this.interface.model);    
    //let result = this._typedJson.parse(str);
    let str = JSON.stringify(this.interface.model);
    let result = JSON.parse(str);
    return result;
  }  
}
