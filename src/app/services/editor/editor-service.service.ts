import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceCapabilityFormControl } from 'src/app/formControls/InterfaceCapabilityFormControl';
import { FormBuilder } from '@angular/forms';
import { CommandCapabilityFormControl } from 'src/app/formControls/CommandCapabilityFormControl';
import { PropertyCapabilityFormControl } from 'src/app/formControls/PropertyCapabilityFormControl';
import { TelemetryCapabilityFormControl } from 'src/app/formControls/TelemetryCapabilityFormControl';
import { ICapabilityFormControl } from 'src/app/formControls/ICapabilityFormControl';
import { RelationshipCapabilityFormControl } from 'src/app/formControls/RelationshipCapabilityFormControl';
import { ComponentCapabilityFormControl } from 'src/app/formControls/ComponentCapabilityFormControl';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ICapabilityModel } from 'src/app/models/ICapabilityModel';

@Injectable({
  providedIn: 'root'
})

export class EditorService {
  public classTypes: string[];
  public capabilities: string[];
  public semantics: string[];
  public schemaTypes: string[];
  public complexShcemaTypes: string[];
  public interfaces: InterfaceCapabilityFormControl[];
  public commandTypes: string[];
  public treeDataSource: MatTreeNestedDataSource<InterfaceCapabilityFormControl>;

  private _httpClient: HttpClient;
  
  constructor(httpClient: HttpClient, public formBuilder: FormBuilder) { 
    this._httpClient = httpClient;
    this.classTypes = this.getClassTypes();
    this.capabilities = this.getCapabilityTypes();
    this.semantics= this.getSemanticTypes();
    this.schemaTypes = this.getSchemaTypes();
    this.complexShcemaTypes = this.getComplexSchemaTypes();
    this.interfaces = new Array<InterfaceCapabilityFormControl>();
    this.commandTypes = this.getCommandTypes();
    this.treeDataSource = new MatTreeNestedDataSource<InterfaceCapabilityFormControl>();  
    
    let interfaceInstance = new InterfaceCapabilityFormControl(this.formBuilder);
    interfaceInstance.model.name = "Default Interface";
    this.addInterface(interfaceInstance);
  }

  public getClassTypes() : string[] {
    return ["Interface", "Telemetry", "Property", "Command", "Relationship", "Component"];
  }

  public getCapabilityTypes() : string[] {
    return ["Property", "Command", "Telemetry"];
  }

  public getSemanticTypes() : string[] {
    return ["Acceleration", "Angle", "AngularAcceleration", "AngularVelocity", "Area", "Capacitance", "Current", "DataRate", "DataSize", "Density", "Distance", "ElectricCharge", "Energy", "Force", "Frequency", "Humidity", "Illuminance", "Inductance", "Latitude", "Longitude", "Length", "Luminance", "Luminosity", "LuminousFlux", "LuminousIntensity", "MagneticFlux", "MagneticInduction", "Mass", "MassFlowRate", "Power", "Pressure", "RelativeHumidity", "Resistance", "SoundPressure", "Temperature", "Thrust", "TimeSpan", "Torque", "Velocity", "Voltage", "Volume", "VolumeFlowRate"];
  }

  public getSchemaTypes() : string[] {
    return ["boolean", "date", "dateTime", "double", "duration", "float", "integer", "long", "string", "time"];
  }

  public getComplexSchemaTypes() : string[] {
    return ["Array", "Enum", "Map", "Object"];
  }

  public getCommandTypes() : string[] {
    return ["synchronous", "asynchronous"];
  }

  public addInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    this.interfaces.push(interfaceInstance);
  }

  public addPropertyToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let capability = new PropertyCapabilityFormControl(this.formBuilder);
        this.pushInterfaceContents(interfaceInstance, capability);
  }

  public addCommandToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {   
    let capability = new CommandCapabilityFormControl(this.formBuilder);
    this.pushInterfaceContents(interfaceInstance, capability);
  }

  public addTelemetryToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let capability = new TelemetryCapabilityFormControl(this.formBuilder);
    this.pushInterfaceContents(interfaceInstance, capability);
  }

  public addComponentToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let capability = new ComponentCapabilityFormControl(this.formBuilder);
    this.pushInterfaceContents(interfaceInstance, capability);
  }

  public addRelationshipToInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    let capability = new RelationshipCapabilityFormControl(this.formBuilder);
    this.pushInterfaceContents(interfaceInstance, capability);
  }

  private pushInterfaceContents(interfaceInstance: InterfaceCapabilityFormControl, capability: ICapabilityFormControl<ICapabilityModel>): void {    
    interfaceInstance.contents.push(capability);
    interfaceInstance.model.contents.add(capability.model);

    console.log("Form Capabilities: " + interfaceInstance.contents.length + 
        ". Properties: " + interfaceInstance.properties.length + 
        ", Commands: " + interfaceInstance.commands.length + 
        ", Telemetry: " + interfaceInstance.telemetries.length +
        ", Components: " + interfaceInstance.components.length +
        ", Relationships: " + interfaceInstance.relationships.length);

    console.log("Model Capabilities: " + interfaceInstance.model.contents.size + 
        ". Properties: " + interfaceInstance.model.properties.length + 
        ", Commands: " + interfaceInstance.model.commands.length + 
        ", Telemetry: " + interfaceInstance.model.telemetries.length +
        ", Components: " + interfaceInstance.model.components.length +
        ", Relationships: " + interfaceInstance.model.relationships.length);
  }

  public  addPropertyToRelationship(relationshipInstance: RelationshipCapabilityFormControl): void {
    let capability = new PropertyCapabilityFormControl(this.formBuilder);
    this.pushRelationshipProperties(relationshipInstance, capability);
  }

  private pushRelationshipProperties(relationshipInstance: RelationshipCapabilityFormControl, capability: ICapabilityFormControl<ICapabilityModel>): void {
    relationshipInstance.properties.push(capability);
    console.log("Properties: " + relationshipInstance.properties.length);
  }
}