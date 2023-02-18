import { Injectable } from '@angular/core';
import { InterfaceCapabilityFormControl } from '../../formControls/InterfaceCapabilityFormControl';
import { FormArray, FormBuilder } from '@angular/forms';
import { CommandCapabilityFormControl } from '../../formControls/CommandCapabilityFormControl';
import { PropertyCapabilityFormControl } from '../../formControls/PropertyCapabilityFormControl';
import { TelemetryCapabilityFormControl } from '../../formControls/TelemetryCapabilityFormControl';
import { RelationshipCapabilityFormControl } from '../../formControls/RelationshipCapabilityFormControl';
import { ComponentCapabilityFormControl } from '../../formControls/ComponentCapabilityFormControl';
import { Subject } from 'rxjs';
import { RelationshipCapabilityModel } from '../../models/RelationshipCapabilityModel';
import { PropertyCapabilityModel } from '../../models/PropertyCapabilityModel';
import { CommandCapabilityModel } from '../../models/CommandCapabilityModel';
import { ComponentCapabilityModel } from '../../models/ComponentCapabilityModel';
import { TelemetryCapabilityModel } from '../../models/TelemetryCapabilityModel';
import { ValidationService } from '../validation/validation-service.service';
import { SettingsService } from '../settings/settings.service';
import { AbstractCapabilityFormControl } from '../../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../../models/AbstractCapabilityModel';

@Injectable({
  providedIn: 'root'
})

export class EditorService {
  private _formBuilder: FormBuilder;
  private _validationService: ValidationService;
  public classTypes: string[];
  public capabilities: string[];
  public semanticTypes: string[];
  public units: Map<string, Array<string>>;
  public commandTypes: string[];
  public interfaces: InterfaceCapabilityFormControl[];
  public interfaces$: Subject<InterfaceCapabilityFormControl>;  
  private _settingsService: SettingsService
  
  constructor(validationService: ValidationService, formBuilder: FormBuilder, settingsService: SettingsService) { 
    this._validationService = validationService;
    this._formBuilder = formBuilder;
    this.classTypes = this.getClassTypes();
    this.capabilities = this.getCapabilityTypes();
    this.semanticTypes = this.getSemanticTypes();
    this.units = this.getUnits();
    this.commandTypes = this.getCommandTypes();
    this.interfaces = new Array<InterfaceCapabilityFormControl>();
    this.interfaces$ = new Subject<InterfaceCapabilityFormControl>(); 
    this._settingsService = settingsService; 
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

  public addInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    this.interfaces.push(interfaceInstance);
    this.interfaces$.next(interfaceInstance);
  }

  public addPropertyToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myProperty");
    let model = new PropertyCapabilityModel(dtmi);
    let formControl = new PropertyCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addCommandToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myCommand");
    let model = new CommandCapabilityModel(dtmi);   
    let formControl = new CommandCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addTelemetryToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myTelemetry");
    let model = new TelemetryCapabilityModel(dtmi);
    let formControl = new TelemetryCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addComponentToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myComponent");
    let model = new ComponentCapabilityModel(dtmi);
    let formControl = new ComponentCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  public addRelationshipToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let dtmi = this._settingsService.buildDtmi("myRelationship");
    let model = new RelationshipCapabilityModel(dtmi);
    let formControl = new RelationshipCapabilityFormControl(model, this._validationService, this._formBuilder);
    this.pushInterfaceContents(interfaceInstance, formControl);
  }

  private pushInterfaceContents(interfaceInstance: InterfaceCapabilityFormControl, formControl: AbstractCapabilityFormControl<AbstractCapabilityModel>): void {    
    let contentsFormArray = interfaceInstance.form.get("contents") as FormArray;
    contentsFormArray.push(formControl.form);
    interfaceInstance.contents.push(formControl);    
    interfaceInstance.model.contents.push(formControl.model);
    this.interfaces$.next(interfaceInstance);

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
    let capability = new PropertyCapabilityFormControl(model,  this._validationService, this._formBuilder);
    this.pushRelationshipProperties(relationshipInstance, capability);
  }

  private pushRelationshipProperties(relationshipInstance: RelationshipCapabilityFormControl, formControl: PropertyCapabilityFormControl): void {
    let formArray = relationshipInstance.form.get("properties") as FormArray;
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
    result.push(...this.interfaces.filter(x => x.model.id != id).map(x => x.model.id));
    return result;
  }

  public deleteCapabilityFromInterface(interfaceInstance: InterfaceCapabilityFormControl, formIndex: [number, number]): void {
    if(formIndex[0] < 0 || formIndex[1] < 0) return;
    let contentsFormArray = interfaceInstance.form.get("contents") as FormArray;
    contentsFormArray.removeAt(formIndex[1]);
    interfaceInstance.contents.splice(formIndex[1], 1);
    interfaceInstance.model.contents.splice(formIndex[1], 1);
    this.interfaces$.next(interfaceInstance);
  }
}