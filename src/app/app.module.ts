import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MainEditorComponent } from './main-editor/main-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { PreviewPanelComponent } from './preview-panel/preview-panel.component';
import { CommandPayloadComponent } from './command/command.component';
import { JsonLdPipe } from './filters/jsonld.pipe';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { PropertyComponent } from './property/property.component';

import { MatIconModule } from '@angular/material/icon';
import { InterfaceComponent } from './interface/interface.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { ComponentComponent } from './component/component.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModelTreeComponent } from './model-tree/model-tree.component';
import { MatDividerModule } from '@angular/material/divider';
import { FolderSelectComponent } from './file-select/file-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { ObjectSchemaComponent } from './object-schema/object-schema.component';
import { ObjectSchemaEditorComponent } from './object-schema-editor/object-schema-editor.component';
import { PrimativeSchemaComponent } from './primative-schema/primative-schema.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainEditorComponent,
    PreviewPanelComponent,
    CommandPayloadComponent,
    JsonLdPipe,
    TelemetryComponent,
    PropertyComponent,
    InterfaceComponent,
    RelationshipComponent,
    ComponentComponent,
    ModelTreeComponent,
    FolderSelectComponent,
    ErrorSnackbarComponent,
    ObjectSchemaComponent,
    PrimativeSchemaComponent,
    ObjectSchemaEditorComponent,
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
    MatDialogModule
  ],
  entryComponents: [
    ObjectSchemaEditorComponent
  ],
  providers: [
		MatDialog,
    { provide: MatDialogRef, useValue: {} }
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
