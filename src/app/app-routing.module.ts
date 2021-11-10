import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderSelectComponent } from './file-select/file-select.component';
import { MainEditorComponent } from './main-editor/main-editor.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [  
  { path: 'import', component: FolderSelectComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: MainEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
