
import { LanguageMap } from './LanguageMap';

export class DisplayNameDescriptionLanguageMap {
  public displayNameMap: Array<LanguageMap>;
  public descriptionMap: Array<LanguageMap>;

  constructor() {
    this.displayNameMap = new Array<LanguageMap>()
    this.descriptionMap = new Array<LanguageMap>()
  }
}