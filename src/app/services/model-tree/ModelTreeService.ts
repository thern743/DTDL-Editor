import { Injectable } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { CapabilityNode } from "src/app/models/CapabilityNode";
import { ICapabilityModel } from "src/app/models/ICapabilityModel";
import { InterfaceCapabilityFormControl } from "src/app/formControls/InterfaceCapabilityFormControl";
import { ICapabilityFormControl } from "src/app/formControls/ICapabilityFormControl";

@Injectable({
    providedIn: 'root'
})
export class ModelTreeService {
    public treeControl!: NestedTreeControl<CapabilityNode>;
    public treeDataSource: MatTreeNestedDataSource<CapabilityNode>;
    public showFiller: boolean = true;

    constructor() {
        this.treeDataSource = new MatTreeNestedDataSource<CapabilityNode>();  
        this.treeControl = new NestedTreeControl<CapabilityNode>(this.getChildren);
    }

    public mapDataSource(interfaces: InterfaceCapabilityFormControl[]): void {
        let data = new Array<CapabilityNode>();
        
        interfaces.forEach((interfaceInstance: InterfaceCapabilityFormControl) => {
            let node = new CapabilityNode(interfaceInstance.model.name);
            this.mapChildren(interfaceInstance, node);
            data.push(node);
            
        });
    
        this.treeDataSource.data = data;
    }
    
    public mapChildren(interfaceInstance: InterfaceCapabilityFormControl, node: CapabilityNode): void {
        node.children = new Array<CapabilityNode>();
        interfaceInstance.contents.forEach((capability: ICapabilityFormControl<ICapabilityModel>) => {
            let child = new CapabilityNode(capability.model.name);
            node.children?.push(child);
        }); 
    }

    public addNode(interfaceInstance: InterfaceCapabilityFormControl) {
        console.log("Pushing new node");
        let node = new CapabilityNode(interfaceInstance.model.name);
        this.treeDataSource.data.push(node);
    }

    public getChildren = (node: CapabilityNode) => node instanceof CapabilityNode ? node.children : null;

    public hasChild = (_: number, node: CapabilityNode) => node instanceof CapabilityNode ? node.children && node.children.length > 0 : false;
}