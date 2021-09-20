import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MainEditorComponent } from './main-editor/main-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule }  from '@angular/material/list';
import { MatInputModule}  from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PreviewPanelComponent } from './preview-panel/preview-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainEditorComponent,
    PreviewPanelComponent
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
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
