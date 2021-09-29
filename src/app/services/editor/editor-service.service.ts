import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceCapability } from 'src/app/models/InterfaceCapability';
import { FormBuilder } from '@angular/forms';
import { CommandCapability } from 'src/app/models/CommandCapability';
import { PropertyCapability } from 'src/app/models/PropertyCapability';
import { TelemetryCapability } from 'src/app/models/TelemetryCapability';

@Injectable({
  providedIn: 'root'
})

export class EditorService {
  classTypes: string[];
  capabilities: string[];
  semantics: string[];
  schemaTypes: string[];
  complexShcemaTypes: string[];
  interfaces: string[];
  commandTypes: string[];
  
  constructor(private http: HttpClient, public fb: FormBuilder) { 
    this.classTypes = this.getClassTypes();
    this.capabilities = this.getCapabilityTypes();
    this.semantics= this.getSemanticTypes();
    this.schemaTypes = this.getSchemaTypes();
    this.complexShcemaTypes = this.getComplexSchemaTypes();
    this.interfaces = new Array();
    this.commandTypes = this.getCommandTypes();
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

  addProperty(interfaceInstance: InterfaceCapability): void {   
    interfaceInstance.properties.push(new PropertyCapability(this.fb));      
  }

  addCommand(interfaceInstance: InterfaceCapability): void {   
    interfaceInstance.commands.push(new CommandCapability(this.fb));      
  }

  addTelemetry(interfaceInstance: InterfaceCapability): void {   
    interfaceInstance.telemetries.push(new TelemetryCapability(this.fb));      
  } 
}
