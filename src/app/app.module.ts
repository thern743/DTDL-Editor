import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MainEditorComponent } from './main-editor/main-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreviewPanelComponent } from './preview-panel/preview-panel.component';
import { CommandPayloadComponent } from './command/command.component';
import { JsonLdPipe } from './filters/jsonld.pipe';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { PropertyComponent } from './property/property.component';
import { InterfaceComponent } from './interface/interface.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { ComponentComponent } from './component/component.component';
import { ModelTreeComponent } from './model-tree/model-tree.component';
import { FolderSelectComponent } from './file-select/file-select.component';
import { FormsModule } from '@angular/forms';
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

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
    ErrorSnackbarComponent
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
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
