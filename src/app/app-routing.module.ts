import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportModelComponent } from './import-model/import-model.component';
import { MainEditorComponent } from './main-editor/main-editor.component';
import { ModelValidationComponent } from './model-validation/model-validation.component';
import { SettingsComponent } from './settings/settings.component';
import { ModelTreeComponent } from './model-tree/model-tree.component';
import { FileNavComponent } from './file-nav/file-nav.component';

const routes: Routes = [  
  { path: 'files', component: FileNavComponent, outlet: "sidenav" },
  { path: 'models', component: ModelTreeComponent, outlet: "sidenav" },
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
