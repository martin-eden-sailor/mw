import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';

/**
 * This is the component that displays errors.
 */
@Component({
  template: `<p class="help is-danger" [class.hide]="hide">{{ textI }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  textI: string;
  hide = true;

  constructor(private cdr: ChangeDetectorRef) {
  }

  @Input() set text(value) {
    if (value === false) {
      this.textI = '';
      this.hide = true;
    } else if (value !== this.textI) {
      this.textI = value;
      this.hide = false;
    }
    this.cdr.detectChanges(); // @todo Why do we need it in the input property?
  }
}