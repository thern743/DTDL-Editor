import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../services/generator/generator.service';

@Component({
  selector: 'preview-panel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.less']
})
export class PreviewPanelComponent implements OnInit {
  jsonDoc: string;

  constructor(GeneratorService : GeneratorService) { 
    GeneratorService.generate();
    this.jsonDoc = GeneratorService.jsonDoc;
  }

  ngOnInit(): void {
  }

}
