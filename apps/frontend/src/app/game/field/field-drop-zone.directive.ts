import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FieldDropZoneService, DropZoneKey } from './field-drop-zone.service';

@Directive({
  selector: '[appFieldDropZone]',
  standalone: true,
})
export class FieldDropZoneDirective implements OnInit, OnDestroy {
 @Input('appFieldDropZone') key!: DropZoneKey;

  private el = inject(ElementRef<HTMLElement>);
  private registry = inject(FieldDropZoneService);

  ngOnInit() {
    this.registry.register(this.key, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.registry.unregister(this.key);
  }
}