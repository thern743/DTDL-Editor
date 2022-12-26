import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportModelComponent } from './import-model/import-model.component';
import { MainEditorComponent } from './main-editor/main-editor.component';
import { ModelValidationComponent } from './model-validation/model-validation.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [  
  { path: 'import', component: ImportModelComponent },
  { path: 'validate', component: ModelValidationComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: MainEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
