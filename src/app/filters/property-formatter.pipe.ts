import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "propertyFormatter" })
export class PropertyFormatterPipe implements PipeTransform {
  constructor() {
    
  }

  public transform(value: any): string {
    if (typeof value === 'string') {
      value = value.split(",");
    }
    
    if(value instanceof Array && value.length > 1) {
      let val1 = value[0];
      let val2 = "";

      for(let i = 1; i < value.length; i++) {
        val2 += `${value[i]}, `;
      }

      let ret = val2.length > 1 ?  `${val1} (${val2.substring(0, val2.length - 2)})` : val1;
      return ret;
    }

    return value;
  }
}