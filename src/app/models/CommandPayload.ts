
import { AbstractSchemaModel } from './AbstractSchemaModel';
import { LanguageMap } from './LanguageMap';

export class CommandPayload extends AbstractSchemaModel {
  public "@id"!: string;

  public name!: string;

  public schema!: string | AbstractSchemaModel;

  public displayName!: string | Array<LanguageMap>;

  public description!: string | Array<LanguageMap>;

  public comment!: string;

  constructor(id: string) {
    super(id, "CommandPayload");
  }
}