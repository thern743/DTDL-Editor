import { Injectable } from "@angular/core";
import { InterfaceCapabilityFormControl } from "./InterfaceCapabilityFormControl";

@Injectable({
  providedIn: 'root'
})
export class DtdlModelForm {
  interfaces: InterfaceCapabilityFormControl[];
  
  constructor() {  
    this.interfaces = new Array<InterfaceCapabilityFormControl>();    
  }
}