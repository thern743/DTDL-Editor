# Digital Twin Definition Language (DTDL) Model Editor

A general-purpose editor inspired by [Azure IoT Central's model editor](https://docs.microsoft.com/en-us/azure/iot-central/core/howto-set-up-template) currently supporting [DTDLv2](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md).

**NOTE:** This project currently supports NodeJS 20.11.1, Typescript 5.4.0, with Angular 17 and Material 17.

## Currently Supported Features
* Basic support for:
  * Interfaces,
  * Properties,
  * Commands,
  * Telemetry,
  * Components,
  * Relationships (and Properties)
* Command Request/Response payloads
* Semantic Types and Units
* Primitive Schema Types
* Complex Schema Types (Array, Map, Enum, Object)
* Interface Schemas
* [Full DTDL validation](#model-validation)
* Importing existing models
* Basic file management
* Copy/Save models locally
* Editor settings
  * Set DTMI scheme, path, and version 
  * Set Context
* Selecting DTDLv3 annotations and extensions 

## Near-Term Features
* Full DTDLv3 annotation and extension support

## Long-Term Features
* Advanced organization of models
* Model graph and visuals
* Basic model simulation features

## Known Issues
* There are a few known issues related to importing models
* Component and Relationship references are limited
* Some issues when nesting Complex schema types (e.g., Map => Map, Object => Map, etc )
* No inline validation before submitting to validation API

## Model Validation

Model validation is performed using Microsoft's DTDL model validator. This is exposed via HTTP API. See source code here: https://github.com/thern743/DTDL-Editor-Api
  
Update the `environment.<env>.ts` files and set the `apiUrl` to the correct location. 

Model validation library:  https://github.com/azure-samples/dtdl-validator/tree/master/

# Notes About JSON-LD and the DTDL Spec

This project is particularly complicated by the fact that DTDL is a JSON-LD based specification. Much of the DTDL spec is unintuitive.

For instance, many attributes can either be a single string value or, optionally, an array/object (see `@context`,  `@type`, and `schema`). Another example are that some attributes are specifically called to be *Sets* of values as opposed to *Array*, *List* or *Map* (see `contents`, `extends`, and `schemas`).

For more details on some design choices, see [Philosophy and Design Notes](#philosophy-and-design-notes).

# Importing Models

Importing models makes use of the browser's local storage. File contents are saved locally only; there is no backend support for storing data.

# Setup

1. Install NodeJS and `npm`.

2. Install Angular globally:

        npm install -g @angular/cli

3. Install npm packages:

        npm update

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Philosophy and Design Notes

All forms are built using Angular Reactive Forms. There are two base interfaces from which all models and forms are constructed:

* `ICapabilityModel`
* `ICapabilityFormControl<ICapabilityModel>`

> NOTE: These interfaces have base abstract class implementations.

All `ICapabilityFormControl<T>` implementations wrap an instance of `FormGroup` and `ICapabilityModel`. This interface exposes two important methods:

* `toFormGroup()`
  - Creates the `FormGroup` instance from the backing model
* `subscribeModelToForm()`
  - Syncs the backing model to the `FormGroup`