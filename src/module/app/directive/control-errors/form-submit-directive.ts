import {Directive, ElementRef} from '@angular/core';
import {fromEvent} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';


/**
 * It is attached to  an element of the form to receive submit event.
 * We assume that it is attached to FormGroup.
 */
@Directive({
  selector: 'form'
})
export class FormSubmitDirective {
  public submit$ = fromEvent(this.element, 'submit')
    .pipe(
      tap(() => {
        if (this.element.classList.contains('submitted') === false) {
          this.element.classList.add('submitted');
        }
      }),
      shareReplay(1)
    );

  constructor(private host: ElementRef<HTMLFormElement>) {}

  get element() {
    return this.host.nativeElement;
  }
}

