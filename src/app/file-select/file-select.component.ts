import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FileSelectComponent implements OnInit {
  @Input() title!: string;
  @Input() action!: string;
  @Output() fileSelect = new EventEmitter<any>();
  @ViewChild("fileInput") fileInput!: ElementRef;  
  public fileService: FileService;

  constructor(fileService: FileService) {
    this.fileService = fileService;
  }

  public ngOnInit(): void {  }

  public executeAction(data: any): any {
    let action = this.action.toLocaleLowerCase();
    if (action === "import")
      return this.importFiles(data);
    else if (action  === "copy")
      return this.copyFile(data);
  }

  public importFiles(file: any): void {
    this.fileService.importFiles(file).subscribe((capability: InterfaceCapabilityModel) => { 
      console.debug(`Loaded file '${capability.displayName}'.`);

      if (!capability) {
        console.error("Error loading file.");
        return;
      }
      
      this.fileSelect.emit(capability);
    });

    this.fileInput.nativeElement.value = "";
  }

  public copyFile(file: any): void {
    this.fileService.copyFile(file).subscribe((capability: any) => {
      console.debug("Loaded JSON.");

      if (!capability) {
        console.error("Error loading file.");
        return;
      }

      this.fileSelect.emit(capability);
    });

    this.fileInput.nativeElement.value = "";
  }
}
