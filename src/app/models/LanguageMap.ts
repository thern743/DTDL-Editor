import 'reflect-metadata';
import { jsonObject } from "typedjson";

@jsonObject
export class LanguageMap {
  public key?: string;
  public value?: string;
}