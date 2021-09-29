import { Injectable } from "@angular/core";
import { InterfaceCapability } from "./InterfaceCapability";

@Injectable({
  providedIn: 'root'
})
export class DtdlModelForm {
  interfaces: InterfaceCapability[];
  
  constructor() {  
    this.interfaces = new Array<InterfaceCapability>();    
  }
}