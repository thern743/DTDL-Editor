import 'reflect-metadata';
import { jsonObject } from "typedjson";
import { LanguageMap } from './LanguageMap';

@jsonObject
export class DisplayNameDescriptionLanguageMap {
  public displayNameMap: Array<LanguageMap>;
  public descriptionMap: Array<LanguageMap>;

  constructor() {
    this.displayNameMap = new Array<LanguageMap>()
    this.descriptionMap = new Array<LanguageMap>()
  }
}