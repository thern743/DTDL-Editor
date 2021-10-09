import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { EditorService } from '../services/editor/editor-service.service';
import { InterfaceCapability } from '../models/InterfaceCapability';
import { ICapability } from '../models/ICapability';

@Component({
  selector: 'model-tree',
  templateUrl: './model-tree.component.html',
  styleUrls: ['./model-tree.component.scss']
})
export class ModelTreeComponent implements OnInit {
  treeControl: NestedTreeControl<ICapability>;
  showFiller: boolean = true;

  constructor(public editorService: EditorService) {
    this.treeControl = new NestedTreeControl<ICapability>(this.getChildren);       
  }

  ngOnInit(): void {
    this.editorService.treeDataSource.data = this.editorService.dtdlModelForm.interfaces;
  }

  getChildren = (node: ICapability) => node instanceof InterfaceCapability ? node?.contents : null;

  hasChild = (_: number, node: ICapability) => node instanceof InterfaceCapability ? !!node.contents && node.contents.length > 0 : false;
}