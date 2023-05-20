import { Component, OnInit } from '@angular/core';
import { CapabilityNode } from '../models/CapabilityNode';
import { FileTreeService } from '../services/file-tree/file-tree.service';
import { FileData } from '../models/FileData';
import { CapabilityFlatNode } from '../models/CapabilityFlatNode';
import { FileService } from '../services/file/file.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit {
  private _fileService: FileService;
  public fileTreeService: FileTreeService;

  constructor(fileService: FileService, fileTreeService: FileTreeService) {
    this._fileService = fileService;
    this.fileTreeService = fileTreeService;
  }

  public ngOnInit(): void {
    this.fileTreeService.mapDataSource(this._fileService.files);
    this.subscribe();
  }  

  private subscribe() {
    this._fileService.files$.subscribe((files: Array<FileData>) => {
      this.fileTreeService.mapDataSource(files);
    });
  }  

  public getDisplayName(node: CapabilityNode): string | undefined {
    return node.displayName;
  }

  public hasChild = (_: number, node: CapabilityFlatNode) => this.fileTreeService.hasChild(_, node);

  public isExpanded(node: CapabilityFlatNode): boolean {
    return this.fileTreeService.treeControl.isExpanded(node);
  }

  public drop($event: any) {

  }
}
