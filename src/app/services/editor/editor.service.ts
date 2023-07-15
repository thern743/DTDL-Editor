import { Injectable } from '@angular/core';
import { InterfaceCapabilityFormControl } from '../../formControls/InterfaceCapabilityFormControl';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { CommandCapabilityFormControl } from '../../formControls/CommandCapabilityFormControl';
import { PropertyCapabilityFormControl } from '../../formControls/PropertyCapabilityFormControl';
import { TelemetryCapabilityFormControl } from '../../formControls/TelemetryCapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../../formControls/RelationshipCapabilityFormControl';
import { ComponentCapabilityFormControl } from '../../formControls/ComponentCapabilityFormControl';
import { BehaviorSubject, Subject } from 'rxjs';
import { RelationshipCapabilityModel } from '../../models/RelationshipCapabilityModel';
import { PropertyCapabilityModel } from '../../models/PropertyCapabilityModel';
import { CommandCapabilityModel } from '../../models/CommandCapabilityModel';
import { ComponentCapabilityModel } from '../../models/ComponentCapabilityModel';
import { TelemetryCapabilityModel } from '../../models/TelemetryCapabilityModel';
import { ValidationService } from '../validation/validation-service.service';
import { SettingsService } from '../settings/settings.service';
import { AbstractCapabilityFormControl } from '../../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../../models/AbstractCapabilityModel';
import { AbstractSchemaModel } from 'src/app/models/AbstractSchemaModel';
import { SchemaService } from '../schema/schema.service';
import { SchemaModalParameters } from 'src/app/models/SchemaModalParameters';
import { SchemaModalResult } from 'src/app/models/SchemaModalResult';
import { SchemaModalComponent } from 'src/app/schema-modal/schema-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { InterfaceCapabilityModel } from 'src/app/models/InterfaceCapabilityModel';
import { FileService } from '../file/file.service';
import { FileData } from 'src/app/models/FileData';
import { MapValueFormControl } from 'src/app/formControls/MapValueFormControl';

@Injectable({
  providedIn: 'root'
})

export class EditorService {
  public classTypes: string[];
  public capabilities: string[];
  public semanticTypes: string[];
  public units: Map<string, Array<string>>;
  public commandTypes: string[];
  public interfaces: InterfaceCapabilityFormControl[];
  public interfaces$: BehaviorSubject<InterfaceCapabilityFormControl[]>;  
  private _validationService: ValidationService;
  private _schemaService: SchemaService;
  private _settingsService: SettingsService;
  private _fileService: FileService;
  private _formBuilder: UntypedFormBuilder;
  private _dialog: MatDialog;
  
  constructor(validationService: ValidationService, schemaService: SchemaService, settingsService: SettingsService, fileService: FileService, formBuilder: UntypedFormBuilder, dialog: MatDialog) {
    this._validationService = validationService;
    this._schemaService = schemaService;
    this._settingsService = settingsService;
    this._fileService = fileService; 
    this._formBuilder = formBuilder;
    this._dialog = dialog;
    this.classTypes = this.getClassTypes();
    this.capabilities = this.getCapabilityTypes();
    this.semanticTypes = this.getSemanticTypes();
    this.units = this.getUnits();
    this.commandTypes = this.getCommandTypes();
    this.interfaces = new Array<InterfaceCapabilityFormControl>();
    this.interfaces$ = new BehaviorSubject<Array<InterfaceCapabilityFormControl>>(this.interfaces); 
    this.subscribeToModels();
    this.loadModels();
  }

  public getClassTypes() : string[] {
    return ["Interface", "Telemetry", "Property", "Command", "Relationship", "Component"];
  }

  public getCapabilityTypes() : string[] {
    return ["Property", "Command", "Telemetry"];
  }

  public getSemanticTypes() : string[] {
    return ["", "Acceleration", "Angle", "AngularAcceleration", "AngularVelocity", "Area", "Capacitance", "Current", "DataRate", "DataSize", "Density",
    "Distance", "ElectricCharge", "Energy", "Force", "Frequency", "Humidity", "Illuminance", "Inductance", "Latitude", "Longitude", "Length", 
    "Luminance", "Luminosity", "LuminousFlux", "LuminousIntensity", "MagneticFlux", "MagneticInduction", "Mass", "MassFlowRate", "Power", "Pressure", 
    "RelativeHumidity", "Resistance", "SoundPressure", "Temperature", "Thrust", "TimeSpan", "Torque", "Velocity", "Voltage", "Volume", 
    "VolumeFlowRate"];
  }

  public getUnitTypes(): Map<string, Array<string>> {
    let unitTypes = new Map<string, Array<string>>([
      ["", new Array<string>("")],
      ["AccelerationUnit", new Array<string>("metrePerSecondSquared", "centimetrePerSecondSquared", "gForce")],
      ["AngleUnit", new Array<string>("radian", "degreeOfArc", "minuteOfArc", "secondOfArc", "turn")],
      ["AngularAccelerationUnit", new Array<string>("radianPerSecondSquared")],
      ["AngularVelocityUnit", new Array<string>("radianPerSecond", "degreePerSecond", "revolutionPerSecond", "revolutionPerMinute")],
      ["AreaUnit", new Array<string>("squareMetre", "squareCentimetre", "squareMillimetre", "squareKilometre", "hectare", "squareFoot", "squareInch", "acre")],
      ["CapacitanceUnit", new Array<string>("farad", "millifarad", "microfarad", "nanofarad", "picofarad")],
      ["CurrentUnit", new Array<string>("ampere", "microampere", "milliampere")],
      ["DataRateUnit", new Array<string>("bitPerSecond", "kibibitPerSecond", "mebibitPerSecond", "gibibitPerSecond", "tebibitPerSecond", "exbibitPerSecond", "zebibitPerSecond", "yobibitPerSecond", "bytePerSecond", "kibibytePerSecond", "mebibytePerSecond", "gibibytePerSecond", "tebibytePerSecond", "exbibytePerSecond", "zebibytePerSecond", "yobibytePerSecond")],      
      ["DataSizeUnit", new Array<string>("bit", "kibibit", "mebibit", "gibibit", "tebibit", "exbibit", "zebibit", "yobibit", "byte", "kibibyte", "mebibyte", "gibibyte", "tebibyte", "exbibyte", "zebibyte", "yobibyte")],
      ["DensityUnit", new Array<string>("kilogramPerCubicMetre", "gramPerCubicMetre")],
      ["LengthUnit", new Array<string>("metre", "centimetre", "millimetre", "micrometre", "nanometre", "kilometre", "foot", "inch", "mile", "nauticalMile", "astronomicalUnit")],
      ["ChargeUnit", new Array<string>("coulomb")],
      ["EnergyUnit", new Array<string>("joule", "kilojoule", "megajoule", "gigajoule", "electronvolt", "megaelectronvolt", "kilowattHour")],
      ["ForceUnit", new Array<string>("newton", "pound", "ounce", "ton")],
      ["FrequencyUnit", new Array<string>("hertz", "kilohertz", "megahertz", "gigahertz")],
      ["DensityUnit", new Array<string>("kilogramPerCubicMetre", "gramPerCubicMetre")],
      ["IlluminanceUnit", new Array<string>("lux", "footcandle")],
      ["InductanceUnit", new Array<string>("henry", "millihenry", "microhenry")],
      ["AngleUnit", new Array<string>("radian", "degreeOfArc", "minuteOfArc", "secondOfArc", "turn")],
      ["LuminanceUnit", new Array<string>("candelaPerSquareMetre")],
      ["PowerUnit", new Array<string>("watt", "microwatt", "milliwatt", "kilowatt", "megawatt", "gigawatt", "horsepower", "kilowattHourPerYear")],
      ["LuminousFluxUnit", new Array<string>("lumen")],
      ["LuminousIntensityUnit", new Array<string>("candela")],
      ["MagneticInductionUnit", new Array<string>("weber", "maxwell")],
      ["MagneticInductionUnit", new Array<string>("tesla")],
      ["MassUnit", new Array<string>("kilogram", "gram", "milligram", "microgram", "tonne", "slug")],
      ["MassFlowRateUnit", new Array<string>("gramPerSecond", "kilogramPerSecond", "gramPerHour", "kilogramPerHour")],
      ["PressureUnit", new Array<string>("pascal", "kilopascal", "bar", "millibar", "millimetresOfMercury", "poundPerSquareInch", "inchesOfMercury", "inchesOfWater")],
      ["Unitless", new Array<string>("unity", "percent")],
      ["ResistanceUnit", new Array<string>("ohm", "milliohm", "kiloohm", "megaohm")],
      ["SoundPressureUnit", new Array<string>("decibel", "bel")],
      ["TemperatureUnit", new Array<string>("kelvin", "degreeCelsius", "degreeFahrenheit")],
      ["ForceUnit", new Array<string>("newton", "pound", "ounce", "ton")],
      ["TimeUnit", new Array<string>("second", "millisecond", "microsecond", "nanosecond", "minute", "hour", "day", "year")],
      ["TorqueUnit", new Array<string>("newtonMetre")],
      ["VelocityUnit", new Array<string>("metrePerSecond", "centimetrePerSecond", "kilometrePerSecond", "metrePerHour", "kilometrePerHour", "milePerHour", "milePerSecond", "knot")],
      ["VoltageUnit", new Array<string>("volt", "millivolt", "microvolt", "kilovolt", "megavolt")],
      ["VolumeUnit", new Array<string>("cubicMetre", "cubicCentimetre", "litre", "millilitre", "cubicFoot", "cubicInch", "fluidOunce", "gallon")],
      ["VolumeFlowRateUnit", new Array<string>("litrePerSecond", "millilitrePerSecond", "litrePerHour", "millilitrePerHour")]
    ]);

    return unitTypes;
  }

  public getUnits(): Map<string, Array<string>> {
    let units = new Map<string, Array<string>>([
      ["", this.getUnitTypes().get("")!],
      ["Acceleration", this.getUnitTypes().get("AccelerationUnit")!],
      ["Angle", this.getUnitTypes().get("AngleUnit")!],
      ["AngularAcceleration", this.getUnitTypes().get("AngularAccelerationUnit")!],
      ["AngularVelocity", this.getUnitTypes().get("AngularVelocityUnit")!],
      ["Area", this.getUnitTypes().get("AreaUnit")!],
      ["Capacitance", this.getUnitTypes().get("CapacitanceUnit")!],
      ["Current", this.getUnitTypes().get("CurrentUnit")!],
      ["DataRate", this.getUnitTypes().get("DataRateUnit")!],
      ["DataSize", this.getUnitTypes().get("DataSizeUnit")!],
      ["Density", this.getUnitTypes().get("DensityUnit")!],
      ["Distance", this.getUnitTypes().get("LengthUnit")!],
      ["ElectricCharge", this.getUnitTypes().get("ChargeUnit")!],
      ["Energy", this.getUnitTypes().get("EnergyUnit")!],
      ["Force", this.getUnitTypes().get("ForceUnit")!],
      ["Frequency", this.getUnitTypes().get("FrequencyUnit")!],
      ["Humidity", this.getUnitTypes().get("DensityUnit")!],
      ["Illuminance", this.getUnitTypes().get("IlluminanceUnit")!],
      ["Inductance", this.getUnitTypes().get("InductanceUnit")!],
      ["Latitude", this.getUnitTypes().get("AngleUnit")!],
      ["Longitude", this.getUnitTypes().get("AngleUnit")!],
      ["Length", this.getUnitTypes().get("LengthUnit")!],
      ["Luminance", this.getUnitTypes().get("LuminanceUnit")!],
      ["Luminosity", this.getUnitTypes().get("PowerUnit")!],
      ["LuminousFlux", this.getUnitTypes().get("LuminousFluxUnit")!],
      ["LuminousIntensity", this.getUnitTypes().get("LuminousIntensityUnit")!],
      ["MagneticFlux", this.getUnitTypes().get("MagneticFluxUnit")!],
      ["MagneticInduction", this.getUnitTypes().get("MagneticInductionUnit")!],
      ["Mass", this.getUnitTypes().get("MassUnit")!],
      ["MassFlowRate", this.getUnitTypes().get("MassFlowRateUnit")!],
      ["Power", this.getUnitTypes().get("PowerUnit")!],
      ["Pressure", this.getUnitTypes().get("PressureUnit")!],
      ["RelativeHumidity", this.getUnitTypes().get("unitless")!],
      ["Resistance", this.getUnitTypes().get("ResistanceUnit")!],
      ["SoundPressure", this.getUnitTypes().get("SoundPressureUnit")!],
      ["Temperature", this.getUnitTypes().get("TemperatureUnit")!],
      ["Thrust", this.getUnitTypes().get("ForceUnit")!],
      ["TimeSpan", this.getUnitTypes().get("TimeUnit")!],
      ["Torque", this.getUnitTypes().get("TorqueUnit")!],
      ["Velocity", this.getUnitTypes().get("VelocityUnit")!],
      ["Voltage", this.getUnitTypes().get("VoltageUnit")!],
      ["Volume", this.getUnitTypes().get("VolumeUnit")!],
      ["VolumeFlowRate", this.getUnitTypes().get("VolumeFlowRateUnit")!]
    ]);
    return units;
  }

  public getCommandTypes() : string[] {
    return ["synchronous", "asynchronous"];
  }

  private loadModels(): void {
    const data = localStorage.getItem(SettingsService.MODEL_FILES);
    if (!data) return;
    const fileData: Array<FileData> = [...JSON.parse(data)];

    fileData.forEach((file: FileData) => {
      this._fileService.parseRawFileData(file.name ?? "test.json", file.data);
    });
  }

  private subscribeToModels(): void {
    this._fileService.models$.subscribe((model: InterfaceCapabilityModel) => {
      this.addInterfaceForm(model);
    });
  }

  public addInterfaceForm(model: InterfaceCapabilityModel): void {
    var formControl = new InterfaceCapabilityFormControl(model, this._validationService, this._schemaService, this._formBuilder, this._dialog);
    this.addInterface(formControl);
  }

  public addInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    this.interfaces.push(interfaceInstance);
    this.interfaces$.next(this.interfaces);
  }

  public addPropertyToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myProperty");
    let model = new PropertyCapabilityModel(dtmi);
    let formControl = new PropertyCapabilityFormControl(interfaceInstance, model, this._validationService, this._schemaService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addCommandToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myCommand");
    let model = new CommandCapabilityModel(dtmi);   
    let formControl = new CommandCapabilityFormControl(interfaceInstance, model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addTelemetryToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myTelemetry");
    let model = new TelemetryCapabilityModel(dtmi);
    let formControl = new TelemetryCapabilityFormControl(interfaceInstance, model, this._validationService, this._schemaService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addComponentToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myComponent");
    let model = new ComponentCapabilityModel(dtmi);
    let formControl = new ComponentCapabilityFormControl(interfaceInstance, model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addRelationshipToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myRelationship");
    let model = new RelationshipCapabilityModel(dtmi);
    let formControl = new RelationshipCapabilityFormControl(interfaceInstance, model, this._validationService, this._schemaService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  private pushInterfaceContents(interfaceInstance: InterfaceCapabilityFormControl, formControl: AbstractCapabilityFormControl<AbstractCapabilityModel>): void {    
    let contentsFormArray = interfaceInstance.form.get("contents") as UntypedFormArray;
    contentsFormArray.push(formControl.form);
    interfaceInstance.contents.push(formControl);    
    interfaceInstance.model.contents.push(formControl.model);
    this.interfaces$.next(this.interfaces);

    console.groupCollapsed("Interface Form Capabilities");

    console.log("FormArray: %i, Contents: %i, Properties: %i, Commands: %i, Telemetry: %i, Components: %i, Relationships: %i",
      contentsFormArray.length, interfaceInstance.contents.length, interfaceInstance.properties.length,
      interfaceInstance.commands.length, interfaceInstance.telemetries.length, 
      interfaceInstance.components.length, interfaceInstance.relationships.length
    );
    
    console.groupEnd();

    console.groupCollapsed("Interface Model Capabilities");

    console.log("Contents: %i, Properties: %i, Commands: %i, Telemetry: %i, Components: %i, Relationships: %i",
      interfaceInstance.model.contents.length, interfaceInstance.model.properties.length,
      interfaceInstance.model.commands.length, interfaceInstance.model.telemetries.length, 
      interfaceInstance.model.components.length, interfaceInstance.model.relationships.length
    );

    console.groupEnd();
  }

  public addPropertyToRelationship(relationshipInstance: RelationshipCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("NewProperty");
    let model = new PropertyCapabilityModel(dtmi);
    let capability = new PropertyCapabilityFormControl(relationshipInstance.interface, model,  this._validationService, this._schemaService, this._formBuilder);
    this.pushRelationshipProperties(relationshipInstance, capability);
  }

  private pushRelationshipProperties(relationshipInstance: RelationshipCapabilityFormControl, formControl: PropertyCapabilityFormControl): void {
    let formArray = relationshipInstance.form.get("properties") as UntypedFormArray;
    relationshipInstance.properties.push(formControl);
    formArray.push(formControl.form);
    relationshipInstance.model.properties.push(formControl.model);

    console.groupCollapsed("Relationship Form Capabilities");
    console.log("FormArray: %i, Properties: %i", formArray.length, relationshipInstance.properties.length);
    console.groupEnd();

    console.groupCollapsed("Relationship Model Capabilities");
    console.log("Properties: %i", relationshipInstance.model.properties.length);
    console.groupEnd();
  }

  public filterInterfacesForExtends(id: string): string[] {
    let result = new Array<string>("");
    result.push(...this.interfaces.filter(x => x.model["@id"] != id).map(x => x.model["@id"]));
    return result;
  }

  public deleteCapabilityFromInterface(interfaceInstance: InterfaceCapabilityFormControl, formIndex: [number, number]): void {
    if(formIndex[0] < 0 || formIndex[1] < 0) return;
    let contentsFormArray = interfaceInstance.form.get("contents") as UntypedFormArray;
    contentsFormArray.removeAt(formIndex[1]);
    interfaceInstance.contents.splice(formIndex[1], 1);
    interfaceInstance.model.contents.splice(formIndex[1], 1);
    this.interfaces$.next(this.interfaces);
  }

  public deleteInterface(formIndex: number): void {
    this.interfaces.splice(formIndex, 1);
    this.interfaces$.next(this.interfaces);
  }

  public getInterfaceSchemaIndex(interfaceInstance: InterfaceCapabilityFormControl, formControl: AbstractCapabilityFormControl<AbstractSchemaModel>): number {
    // Using the index from the model is NOT a safe assumption here.
    const schemaIndex = interfaceInstance?.model?.schemas?.findIndex(x => x["@id"] == formControl.model["@id"]);
    return schemaIndex == undefined ? -1 : schemaIndex;
  }

  public addOrUpdateInterfaceSchema(interfaceInstance: InterfaceCapabilityFormControl, formControl: AbstractCapabilityFormControl<AbstractSchemaModel>): void {
    const schemaIndex = this.getInterfaceSchemaIndex(interfaceInstance, formControl);

    if(schemaIndex > -1) {
      if(interfaceInstance.model.schemas) {
        interfaceInstance.schemas[schemaIndex] = formControl;
        interfaceInstance.model.schemas[schemaIndex] = formControl.model;
      }
    } else {
      interfaceInstance.schemas.push(formControl);    
      interfaceInstance.model.schemas?.push(formControl.model);
    }

    this.interfaces$.next(this.interfaces);
  }

  public parseNameFromDtmi(dtmi: string) {
    const tokens = dtmi.split(/(?::|;)+/)
    return tokens[tokens.length - 2];
  }

  public getContexts(): Map<string, string> {
    return new Map<string, string>([
      [ "DTDL v2", "dtmi:dtdl:context;2" ],
      [ "DTDL v3", "dtmi:dtdl:context;3" ],
      [ "QuantitativeTypes v1", "dtmi:dtdl:extension:quantitativeTypes;1" ],
      [ "Historization v1", "dtmi:dtdl:extension:historization;1" ],
      [ "Annotation v1", "dtmi:dtdl:extension:annotation;1" ],
      [ "Overriding v1", "dtmi:dtdl:extension:overriding;1" ]
    ]);
  }

  public compareContexts(context1: string, context2: string): boolean {
    return context1 === context2;
  }

  public getSemanticTypeFromType(type: string | Array<string>): string | undefined {
    var needles = typeof type === "string" ? new Array<string>(type) : type;
    var result = this.getSemanticTypes().find(needle => needles.includes(needle));
    return result;
  }

  public openSchemaEditor(capabilityForm: AbstractCapabilityFormControl<AbstractCapabilityModel>, schemaFormControl: AbstractCapabilityFormControl<AbstractSchemaModel>): void {
    let schemaType = schemaFormControl?.model["@type"];
    if (schemaType == undefined) return;

    // We should not make the assumption that the first element is the schema type and not an annotation.
    const isInterfaceSchema = this.getInterfaceSchemaIndex(capabilityForm.interface, schemaFormControl) > -1;
    const modalParameters = new SchemaModalParameters(`Edit ${schemaType}`, schemaType, schemaFormControl, isInterfaceSchema);

    this._dialog
      .open(SchemaModalComponent,
        {
          data: modalParameters,
          height: "90%",
          width: "80%"
        })
      .afterClosed()
      .subscribe((result: SchemaModalResult) => {
        if (result) {
          if(result.interfaceSchema) {
            this.addOrUpdateInterfaceSchema(capabilityForm.interface, result.schemaFormControl);
            capabilityForm?.form.get("schema")?.setValue(result.schemaFormControl.model["@id"]);
          } else {
            capabilityForm?.form.get("schema")?.setValue(result.schemaFormControl.model);
          }
        }
      });
  }

  public toTitleCase(value: string): string {
    return value.replace(
    /\w\S*/g,
    function(txt: string) {
      return txt.charAt(0).toUpperCase() + txt.slice(1);
    }
  );
}
}