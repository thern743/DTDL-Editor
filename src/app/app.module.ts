import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips'; 
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MainEditorComponent } from './main-editor/main-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreviewPanelComponent } from './preview-panel/preview-panel.component';
import { CommandComponent } from './command/command.component';
import { JsonLdPipe } from './filters/jsonld.pipe';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { PropertyComponent } from './property/property.component';
import { InterfaceComponent } from './interface/interface.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { ComponentComponent } from './component/component.component';
import { ModelTreeComponent } from './model-tree/model-tree.component';
import { FileSelectComponent } from './file-select/file-select.component';
import { FormsModule } from '@angular/forms';
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { IdNameHeaderComponent } from './id-name-header-component/id-name-header-component';
import { SettingsComponent } from './settings/settings.component';
import { SuccessSnackbarComponent } from './success-snackbar/success-snackbar.component';
import { PropertyFormatterDirective } from './property-formatter/property-formatter.directive';
import { PropertyFormatterPipe } from './filters/property-formatter.pipe';
import { FieldComponent } from './field/field.component';
import { ObjectSchemaComponent } from './object-schema/object-schema.component';
import { ArraySchemaComponent } from './array-schema/array-schema.component';
import { EnumSchemaComponent } from './enum-schema/enum-schema.component';
import { MapSchemaComponent } from './map-schema/map-schema.component';
import { EnumValueComponent } from './enum-schema/enum-value/enum-value.component';
import { MapKeyComponent } from './map-schema/map-key/map-key.component';
import { MapValueComponent } from './map-schema/map-value/map-value.component';
import { PrimitiveSchemaComponent } from './primitive-schema/primitive-schema.component';
import { ContentInterceptor } from './services/interceptors/content-interceptor';
import { ModelValidationComponent } from './model-validation/model-validation.component';
import { ImportModelComponent } from './import-model/import-model.component';
import { FilterPipe } from './filters/filter.pipe';
import { CommandPayloadComponent } from './command-payload/command-payload.component';
import { SchemaFactories } from './factories/SchemaFactories';
import { LanguageMapComponent } from './localization/language-map/language-map.component';
import { LocalizedDisplayNameDescriptionComponent } from './localization/localized-display-name-description/localized-display-name-description.component';
import { DisplayNameDescriptionComponent } from './localization/display-name-description/display-name-description.component';
import { SchemaModalComponent } from './schema-modal/schema-modal.component';
import { SchemaSemanticTypeUnitComponent } from './schema-semantic-type-unit/schema-semantic-type-unit.component';
import { FileTreeComponent } from './file-tree/file-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    MainEditorComponent,
    PreviewPanelComponent,
    CommandComponent,
    JsonLdPipe,
    TelemetryComponent,
    PropertyComponent,
    InterfaceComponent,
    RelationshipComponent,
    ComponentComponent,
    ModelTreeComponent,
    FileSelectComponent,
    ErrorSnackbarComponent,
    IdNameHeaderComponent,    
    SettingsComponent,
    SuccessSnackbarComponent,
    PropertyFormatterDirective,
    PropertyFormatterPipe,
    FieldComponent,
    ObjectSchemaComponent,
    ArraySchemaComponent,
    EnumSchemaComponent,
    MapSchemaComponent,
    EnumValueComponent,
    MapKeyComponent,
    MapValueComponent,
    PrimitiveSchemaComponent,
    ModelValidationComponent,
    ImportModelComponent,
    FilterPipe,
    CommandPayloadComponent,
    LanguageMapComponent,
    LocalizedDisplayNameDescriptionComponent,
    DisplayNameDescriptionComponent,
    SchemaModalComponent,
    SchemaSemanticTypeUnitComponent,
    FileTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTreeModule,
    MatToolbarModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    ClipboardModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    DragDropModule
  ],
  providers: [
    SchemaFactories,
    MatDialog,
    PropertyFormatterPipe,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
