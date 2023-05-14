import { Injectable } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { CapabilityNode } from "../../models/CapabilityNode";
import { CapabilityFlatNode } from "../../models/CapabilityFlatNode";
import { FileData } from "src/app/models/FileData";
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class FileTreeService {
  public treeControl!: FlatTreeControl<CapabilityFlatNode>;
  public treeDataSource: MatTreeFlatDataSource<CapabilityNode, CapabilityFlatNode>;
  public showFiller: boolean = true;
  public treeFlattener: MatTreeFlattener<CapabilityNode, CapabilityFlatNode>;

  constructor() {
    this.treeControl = new FlatTreeControl<CapabilityFlatNode>(node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  public mapDataSource(files: Array<FileData>): void {
    const data = new Array<CapabilityNode>();

    files.forEach((file: FileData) => {
      let node = new CapabilityNode(file.id ?? "id", file.name ?? "name", file.name ?? "name");
      data.push(node);
    });
    
    this.treeDataSource.data = data;
    this.treeControl.collapseAll();
  }

  public hasChild = (_: number, node: CapabilityFlatNode) => node.expandable;

  private transformer(node: CapabilityNode, level: number): CapabilityFlatNode {
    let flatNode = new CapabilityFlatNode();
    flatNode.expandable = !!node.children && node.children.length > 0;
    flatNode.id = node.id;
    flatNode.displayName = node.displayName;
    flatNode.type = node.type;
    flatNode.level = level;
    return flatNode;
  }
}