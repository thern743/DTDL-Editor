import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GeneratorService {
  dtdlModel: DtdlModel;
  jsonDoc: string;


  constructor() { 
    this.dtdlModel = new DtdlModel();
    this.jsonDoc = "";
  }

  public generate() : void {
    this.jsonDoc = JSON.stringify(this.dtdlModel, DtdlModel.replacer, 2);
  }
}

export class DtdlModel {
  id!: string;
  type!: string;
  displayName!: string;
  context!: string;
  contents: any[];

  constructor(){
    this.id = "dtmi:com:example:Thermostat;1";
    this.type = "Interface";
    this.displayName = "Thermostat";
    this.context = "dtmi:dtdl:context;2";
    this.contents = new Array();

  }

  static replacer(key: any, value: any) {    
    if (value && typeof value === 'object') {
      var replacement: any = {};
      for (var k in value) {
        if (Object.hasOwnProperty.call(value, k) && ["id", "type", "context"].indexOf(k) > -1) {
          replacement["@" + k] = value[k];
        } else {
          replacement[k] = value[k];
        }
      }
      return replacement;
    }
    return value;
  }
}
