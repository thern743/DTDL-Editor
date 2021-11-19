# Digital Twin Definition Language (DTDL) Model Editor

A general-purpose editor inspired by [Azure IoT Central's model editor](https://docs.microsoft.com/en-us/azure/iot-central/core/howto-set-up-template) currently supporting [DTDLv2](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md).

**NOTE:** This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6 and uses [Angular Material](https://material.angular.io/).

## Currently Supported Features
* Basic support for:
  * Interfaces,
  * Properties,
  * Commands,
  * Telemetry,
  * Components,
  * Relationships (and Propertes)
* Basic validation
* Importing existing models
* Copy/Save models locally
* Editor settings
  * Set base DTMI 

## Near-Term Features
* Full DTDL validation
* Semantic Types
* Schema Definitions
* Command Request/Response payloads

## Long-Term Features
* DTDLv3 (depends on Microsoft's timeline)
* Advanced Model Organization
* Model Graph View
* Basic model simulations

## Known Issues
* Very little validation is in place
* Saving DTDL currently preserves NULL values (will fail validation)
* Base DTMI is inherited for all new capabilities
* Component and Relationship references are limited

## Model Validation

Model validation will be performed using Microsoft's DTDL model validator:

        https://github.com/azure-samples/dtdl-validator/tree/master/

# Setup

1. Install NodeJS and `npm`.

2. Install Angular globally:

        npm install -g @angular/cli

3. Install reflect-metadata:

        npm install reflect-metadata

4. Install npm packages:

        npm update

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

