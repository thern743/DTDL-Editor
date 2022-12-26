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
  * Relationships (and Properties)
* Semantic Types and Units
* Primitive Schema Types
* Complex Schema Types (Array, Map, Enum, Object)
* [Full DTDL validation](#model-validation)
* Importing existing models
* Copy/Save models locally
* Editor settings
  * Set DTMI scheme, path, and version 
  * Set Context

## Near-Term Features
* Command Request/Response payloads
* Interface Schemas
* Display string localization

## Long-Term Features
* DTDLv3 and extensions
* Advanced organization of models
* Model graph and visuals
* Basic model simulation features

## Known Issues
* There are several known issues related to importing models
* Component and Relationship references are limited
* Some issues when nesting complex schema types
* No inline validation before submitting to validation API

## Model Validation

Model validation is performed using Microsoft's DTDL model validator. This is exposed via HTTP API. See source code here: https://github.com/thern743/DTDL-Editor-Api
  
Update the `environment.<env>.ts` files and set the `apiUrl` to the correct location. 

Model validation library:  https://github.com/azure-samples/dtdl-validator/tree/master/

# Notes About JSON-LD and the DTDL Spec

This project is particularly complicated by the fact that DTDL is a JSON-LD based specification. Much of the DTDL spec is unintuitive.

> For instance, many attributes can either be a single string value or, optionally, an array/object (see `@context`,  `@type`, and `schema`). Another example are that some attributes are specifically called to be *Sets* of values as opposed to *Array*, *List* or *Map* (see `contents`, `extends`, and `schemas`).

Rather than implement the models natively to work with JSON-LD, we have chosen to take a declarative approach in implementing a JSON-LD filter. See `jsonld.pipe.ts`.

For more details on some design choices, see [Philosophy and Design Notes](#philosophy-and-design-notes).

## Importing Models and TypedJSON

This project relies on the [TypedJSON library](https://github.com/JohnWeisz/TypedJSON) for serdes when importing or exporting DTDL models. This approach makes the use of decorators for annotating JSON attributes and should be familiar for those who use them in other frameworks (e.g., .NET, Java, etc).

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


The purpose of these methods are to emulate the deprecated `ngModel` directive for two-way binding...

## Why? 

The standard explanation on [why `ngModel` with Reactive Forms feature was deprecated](https://angular.io/guide/deprecations#ngmodel-with-reactive-forms) isn't satisfactory. We believe the confusion around `ngModel` stems from the fact that the Reactive Forms implementation itself is limited and needs further work. 

We fundamentally believe that, when working with data structures, developers should work primarily with models (DTOs) and not with abstract concepts (such as `FormControl`). For instance, when adding an element to an array a developer should only be concerned with `array.push()`. Second, most solutions rely heavily on backend data APIs and databases where serialization and deserialization (serdes) are critical. Any abstractions from the framework should be transparently reactive to these concepts.

## Really though, why?

The available classes `FormGroup`, `FormArray`, and `FormControl` are seamless for simple use-cases but fall short in complex situations. Specifically, `FormArray` confusingly extends `FormGroup` and the `getRawValue()` method is limited. 

> Limited how? There are idiosyncrasies of complex, nested JSON objects that are not transparent. There are advanced serdes requirements (e.g., JSON-LD) that Reactive Forms makes difficult.

Therefore, more complex situations require significant amounts of boilerplate code in the view, verbose and confusing `FormBuilder` calls, and manually mapping to/from models using `getRawValue()`. 

For instance, when working with a nested `FormArray` on a parent `FormGroup`, using `formArrayName` for binding requires a getter method to cast the control to a `FormArray` instance and then accessing the `controls` property in the view (see https://angular.io/api/forms/FormArrayName). This imperative approach makes the code unintuitive and unnecessarily verbose.

## So why not use Template Forms? 

Good question. First, there's no doubt that Reactive Forms are the future and for good reason. There are many benefits to them. Really, our choices come down to betting on the future: we believe Reactive Forms will be improved to work more intuitively with backing models. At a minimum, we believe there will be ways of hooking into the behavior of `getRawValue()` (or otherwise having a more intuitive way of controlling the serdes).

