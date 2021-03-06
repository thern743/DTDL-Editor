import { Pipe, PipeTransform } from "@angular/core";
import { SemanticTypeArray } from "../models/SemanticTypeArray";

@Pipe({ name: "propertyFormatter" })
export class PropertyFormatterPipe implements PipeTransform {
  constructor() {
    
  }

  public transform(value: any): string {
    if(value instanceof SemanticTypeArray && value.length > 1) {
      let val1 = value[0];
      let val2 = "";

      for(let i = 1; i < value.length; i++) {
        val2 += value[i] + ",";
      }

      return val2.length > 1 ? val1 + " (" + val2.substr(0, val2.length - 1) + ")" : val1;
    }

    return value;
  }
}