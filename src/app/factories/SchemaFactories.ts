import { Injectable } from "@angular/core";
import { UseFactory } from "../reflection/ReflectionMetadata";
import { ArraySchemaFactory } from "./ArraySchemaFactory";
import { BooleanSchemaFactory } from "./BooleanSchemaFactory";
import { DateSchemaFactory } from "./DateSchemaFactory";
import { DateTimeSchemaFactory } from "./DateTimeSchemaFactory";
import { DoubleSchemaFactory } from "./DoubleSchemaFactory";
import { DurationSchemaFactory } from "./DurationSchemaFactory";
import { FloatSchemaFactory } from "./FloatSchemaFactory";
import { IntegerSchemaFactory } from "./IntegerSchemaFactory";
import { LongSchemaFactory } from "./LongSchemaFactory";
import { MapSchemaFactory } from "./MapSchemaFactory";
import { ObjectSchemaFactory } from "./ObjectSchemaFactory";
import { PrimitiveSchemaFactory } from "./PrimitiveSchemaFactory";
import { StringSchemaFactory } from "./StringSchemaFactory";
import { TimeSchemaFactory } from "./TimeSchemaFactory";
import { EnumSchemaFactory } from "./EnumSchemaFactory";

/*****************************************************************
This class is needed as an 'entry" point to triggering the factory 
decorators handled by ReflectionMetadata.ts.
*****************************************************************/
@Injectable({
  providedIn: 'root'
})
export class SchemaFactories {
  // Primitives
  @UseFactory()
  public booleanSchemaFactory!: BooleanSchemaFactory;

  @UseFactory()
  public dateSchemaFactory!: DateSchemaFactory;

  @UseFactory()
  public dateTimeSchemaFactory!: DateTimeSchemaFactory;

  @UseFactory()
  public doubleSchemaFactory!: DoubleSchemaFactory;

  @UseFactory()
  public durationSchemaFactory!: DurationSchemaFactory;

  @UseFactory()
  public floatSchemaFactory!: FloatSchemaFactory;

  @UseFactory()
  public integerSchemaFactory!: IntegerSchemaFactory;

  @UseFactory()
  public longSchemaFactory!: LongSchemaFactory;

  @UseFactory()
  public primitiveSchemaFactory!: PrimitiveSchemaFactory;

  @UseFactory()
  public stringSchemaFactory!: StringSchemaFactory;

  @UseFactory()
  public timeSchemaFactory!: TimeSchemaFactory;

  // Complex

  @UseFactory()
  public arraySchemaFactory!: ArraySchemaFactory;
  
  @UseFactory()
  public mapSchemaFactory!: MapSchemaFactory;

  @UseFactory()
  public objectSchemaFactory!: ObjectSchemaFactory;

  @UseFactory()
  public enumSchemaFactory!: EnumSchemaFactory;

  constructor() {
  }
}