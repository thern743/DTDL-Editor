import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InterfaceCapabilityDto } from '../models/InterfaceCapabilityDto';
import { InterfaceCapabilityFormControl } from '../models/InterfaceCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { FileService } from '../services/file/file-service.service';

@Component({
  selector: 'file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FolderSelectComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef;
  
  public editorService: EditorService;
  public fileService: FileService;
  private _formBuilder: FormBuilder;

  constructor(editorService: EditorService, fileService: FileService, formBuilder: FormBuilder) {
    this.editorService = editorService;
    this.fileService = fileService;
    this._formBuilder = formBuilder;
  }

  ngOnInit(): void {  }

  uploadFiles(file: any) {
    this.fileService.uploadFiles(file).subscribe((capability: InterfaceCapabilityDto) => { 
      console.log("Received " + capability.name);
      var formControl = new InterfaceCapabilityFormControl(this._formBuilder);
      formControl.capability = capability;
      this.editorService.addInterface(formControl);
    });
    this.fileInput.nativeElement.value = "";
  }
}
