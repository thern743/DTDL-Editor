import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceCapability } from 'src/app/models/InterfaceCapability';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommandCapability } from 'src/app/models/CommandCapability';
import { PropertyCapability } from 'src/app/models/PropertyCapability';
import { TelemetryCapability } from 'src/app/models/TelemetryCapability';
import { ICapability } from 'src/app/models/ICapability';
import { RelationshipCapability } from 'src/app/models/RelationshipCapability';
import { ComponentCapability } from 'src/app/models/ComponentCapability';
import { DtdlModelForm } from 'src/app/models/DtdlModelForm';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Injectable({
  providedIn: 'root'
})

export class EditorService {
  dtdlModelForm: DtdlModelForm;
  classTypes: string[];
  capabilities: string[];
  semantics: string[];
  schemaTypes: string[];
  complexShcemaTypes: string[];
  interfaces: string[];
  commandTypes: string[];
  treeDataSource: MatTreeNestedDataSource<ICapability>;
  
  constructor(private http: HttpClient, dtdlModelForm: DtdlModelForm, public formBuilder: FormBuilder) { 
    this.dtdlModelForm = dtdlModelForm;
    this.classTypes = this.getClassTypes();
    this.capabilities = this.getCapabilityTypes();
    this.semantics= this.getSemanticTypes();
    this.schemaTypes = this.getSchemaTypes();
    this.complexShcemaTypes = this.getComplexSchemaTypes();
    this.interfaces = new Array();
    this.commandTypes = this.getCommandTypes();
    this.treeDataSource = new MatTreeNestedDataSource<ICapability>();  
    
    let interfaceInstance = new InterfaceCapability(this.formBuilder);
    interfaceInstance.name = "Default Interface";
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

  public addInterface(interfaceInstance: InterfaceCapability): void {
    this.dtdlModelForm.interfaces.push(interfaceInstance);
  }

  public addPropertyToInterface(interfaceInstance: InterfaceCapability): void {
    let capability = new PropertyCapability(this.formBuilder);
    this.pushInterfaceContents(interfaceInstance, capability);
  }

  public addCommandToInterface(interfaceInstance: InterfaceCapability): void {   
    let capability = new CommandCapability(this.formBuilder);
    this.pushInterfaceContents(interfaceInstance, capability);
  }

  public addTelemetryToInterface(interfaceInstance: InterfaceCapability): void {
    let capability = new TelemetryCapability(this.formBuilder);
    this.pushInterfaceContents(interfaceInstance, capability);
  }

  public addComponentToInterface(interfaceInstance: InterfaceCapability): void {
    let capability = new ComponentCapability(this.formBuilder);
    this.pushInterfaceContents(interfaceInstance, capability);
  }

  public addRelationshipToInterface(interfaceInstance: InterfaceCapability): void {
    let capability = new RelationshipCapability(this.formBuilder);
    this.pushInterfaceContents(interfaceInstance, capability);
  }

  private pushInterfaceContents(interfaceInstance: InterfaceCapability, capability: ICapability): void {
    let temp = interfaceInstance.form.get("contents") as FormArray;
    interfaceInstance.contents.push(capability);
    temp.push(capability.toFormGroup());
    console.log("Capabilities: " + interfaceInstance.contents.length + 
        ". Properties: " + interfaceInstance.properties.length + 
        ", Commands: " + interfaceInstance.commands.length + 
        ", Telemetry: " + interfaceInstance.telemetries.length +
        ", Components: " + interfaceInstance.components.length +
        ", Relationships: " + interfaceInstance.relationships.length);
  }

  public  addPropertyToRelationship(relationshipInstance: RelationshipCapability): void {
    let capability = new PropertyCapability(this.formBuilder);
    this.pushRelationshipProperties(relationshipInstance, capability);
  }

  private pushRelationshipProperties(relationshipInstance: RelationshipCapability, capability: ICapability): void {
    let temp = relationshipInstance.form.get("properties") as FormArray;
    relationshipInstance.properties.push(capability);
    temp.push(capability.toFormGroup());
    console.log("Properties: " + relationshipInstance.properties.length);
  }
}