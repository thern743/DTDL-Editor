import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MainEditorServiceService {

  constructor(private http: HttpClient) { 

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
}
