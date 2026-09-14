import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { BoardRefRegistryService } from './board-ref-registry.service';
import { BoardRef } from './board-ref.interface';

@Directive({
  selector: '[appBoardRef]',
  standalone: true,
})
export class BoardRefDirective implements OnInit, OnDestroy {
  @Input('appBoardRef') key!: BoardRef;

  private el = inject(ElementRef<HTMLElement>);
  private registry = inject(BoardRefRegistryService);

  ngOnInit() {
    this.registry.register(this.key, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.registry.unregister(this.key);
  }
}