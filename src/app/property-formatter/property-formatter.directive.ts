import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { PropertyFormatterPipe } from "../filters/property-formatter.pipe";

@Directive({ selector: "[propertyFormatter]" })
export class PropertyFormatterDirective implements OnInit {
  private _elementRef: ElementRef;
  private _propertyFormatter: PropertyFormatterPipe;
  private _element: HTMLInputElement;

  constructor(elementRef: ElementRef, propertyFormatter: PropertyFormatterPipe) {
    this._elementRef = elementRef;
    this._propertyFormatter = propertyFormatter;
    this._element = this._elementRef.nativeElement;
  }

  public ngOnInit() {
    let value = typeof this._element.value === 'string' 
      ? this._element.value.split(',') 
      : this._element.value;
    this._element.value = this._propertyFormatter.transform(value);
  }

  @HostListener("ngModelChange", ["$event"])
  public onChange(value: any) {
    this._element.value = this._propertyFormatter.transform(value);
  }
}