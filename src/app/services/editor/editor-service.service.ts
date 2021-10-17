import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceCapabilityFormControl } from 'src/app/models/InterfaceCapabilityFormControl';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommandCapabilityFormControl } from 'src/app/models/CommandCapabilityFormControl';
import { PropertyCapabilityFormControl } from 'src/app/models/PropertyCapabilityFormControl';
import { TelemetryCapabilityFormControl } from 'src/app/models/TelemetryCapabilityFormControl';
import { ICapabilityFormControl } from 'src/app/models/ICapabilityFormControl';
import { RelationshipCapabilityFormControl } from 'src/app/models/RelationshipCapabilityFormControl';
import { ComponentCapabilityFormControl } from 'src/app/models/ComponentCapabilityFormControl';
import { DtdlModelForm } from 'src/app/models/DtdlModelForm';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ICapabilityDto } from 'src/app/models/ICapabilityDto';

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
  interfaces: InterfaceCapabilityFormControl[];
  commandTypes: string[];
  treeDataSource: MatTreeNestedDataSource<ICapabilityFormControl<ICapabilityDto>>;
  
  constructor(private http: HttpClient, dtdlModelForm: DtdlModelForm, public formBuilder: FormBuilder) { 
    this.dtdlModelForm = dtdlModelForm;
    this.classTypes = this.getClassTypes();
    this.capabilities = this.getCapabilityTypes();
    this.semantics= this.getSemanticTypes();
    this.schemaTypes = this.getSchemaTypes();
    this.complexShcemaTypes = this.getComplexSchemaTypes();
    this.interfaces = new Array<InterfaceCapabilityFormControl>();
    this.commandTypes = this.getCommandTypes();
    this.treeDataSource = new MatTreeNestedDataSource<ICapabilityFormControl>();  
    
    let interfaceInstance = new InterfaceCapabilityFormControl(this.formBuilder);
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

  public addInterface(interfaceInstance: InterfaceCapabilityFormControl): void {
    this.dtdlModelForm.interfaces.push(interfaceInstance);
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

  private pushInterfaceContents(interfaceInstance: InterfaceCapabilityFormControl, capability: ICapabilityFormControl<ICapabilityDto>): void {
    let temp = interfaceInstance.form.get("contents") as FormArray;
    interfaceInstance.contents.add(capability);
    temp.push(capability.toFormGroup());
    console.log("Capabilities: " + interfaceInstance.contents.size + 
        ". Properties: " + interfaceInstance.properties.length + 
        ", Commands: " + interfaceInstance.commands.length + 
        ", Telemetry: " + interfaceInstance.telemetries.length +
        ", Components: " + interfaceInstance.components.length +
        ", Relationships: " + interfaceInstance.relationships.length);
  }

  public  addPropertyToRelationship(relationshipInstance: RelationshipCapabilityFormControl): void {
    let capability = new PropertyCapabilityFormControl(this.formBuilder);
    this.pushRelationshipProperties(relationshipInstance, capability);
  }

  private pushRelationshipProperties(relationshipInstance: RelationshipCapabilityFormControl, capability: ICapabilityFormControl<ICapabilityDto>): void {
    let temp = relationshipInstance.form.get("properties") as FormArray;
    relationshipInstance.properties.push(capability);
    temp.push(capability.toFormGroup());
    console.log("Properties: " + relationshipInstance.properties.length);
  }
}