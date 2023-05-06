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
    const val = this._propertyFormatter.transform(this._element.value);
    this._element.value = val;
  }

  @HostListener("ngModelChange", ["$event"])
  public onChange(value: any) {
    this._element.value = this._propertyFormatter.transform(value);
  }
}