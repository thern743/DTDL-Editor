import { Component, Input, OnInit } from '@angular/core';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
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

  constructor(fileService: FileService) { 
    this.fileService = fileService;
  }

  public ngOnInit(): void {
    
  }

  
}
