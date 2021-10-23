import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { EditorService } from '../services/editor/editor-service.service';
import { InterfaceCapabilityFormControl } from '../models/InterfaceCapabilityFormControl';
import { ICapabilityFormControl } from '../models/ICapabilityFormControl';
import { ICapabilityDto } from '../models/ICapabilityDto';

@Component({
  selector: 'model-tree',
  templateUrl: './model-tree.component.html',
  styleUrls: ['./model-tree.component.scss']
})
export class ModelTreeComponent implements OnInit {
  treeControl: NestedTreeControl<ICapabilityFormControl<ICapabilityDto>>;
  showFiller: boolean = true;

  constructor(public editorService: EditorService) {
    this.treeControl = new NestedTreeControl<ICapabilityFormControl<ICapabilityDto>>(this.getChildren);       
  }

  ngOnInit(): void {
    this.editorService.treeDataSource.data = this.editorService.dtdlModelForm.interfaces;
  }

  getChildren = (node: ICapabilityFormControl<ICapabilityDto>) => node instanceof InterfaceCapabilityFormControl ? [...node?.contents] : null;

  hasChild = (_: number, node: ICapabilityFormControl<ICapabilityDto>) => node instanceof InterfaceCapabilityFormControl ? !!node.contents && node.contents.length > 0 : false;
}