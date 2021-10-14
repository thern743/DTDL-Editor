import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InterfaceCapability } from '../models/InterfaceCapability';
import { EditorService } from '../services/editor/editor-service.service';
import { FileService } from '../services/file/file-service.service';

@Component({
  selector: 'file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FolderSelectComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef;
  
  constructor(public editorService: EditorService, public fileService: FileService) {
    
  }

  ngOnInit(): void {  }

  uploadFiles(file: any) {
    this.fileService.uploadFiles(file).subscribe((capability: InterfaceCapability) => { 
      console.log("Received " + capability.name);     
      this.editorService.addInterface(capability);
    });
    this.fileInput.nativeElement.value = "";
  }
}
