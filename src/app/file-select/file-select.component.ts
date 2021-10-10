import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../services/file/file-service.service';

@Component({
  selector: 'file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FolderSelectComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef;
  
  constructor(public fileService: FileService) {
    
  }

  ngOnInit(): void {  }

  uploadFiles(file: any) {
    this.fileService.uploadFiles(file);
    this.fileInput.nativeElement.value = "";
  }
}
