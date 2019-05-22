import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ComponentFactoryResolver, ComponentRef,
  Directive, ElementRef, Host, Inject,
  InjectionToken,
  Input, OnDestroy, OnInit, Optional, ViewContainerRef
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {EMPTY, fromEvent, merge, Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';

/**
 * Make Your Angular Form’s Error Messages Magically Appear.
 * https://netbasal.com/make-your-angular-forms-error-messages-magically-appear-1e32350b7fa5
 * BLITZ - https://stackblitz.com/edit/angular-terms-and-conditions-reactive-forms?embed=1&file=src/app/form-errors.ts
 */

/**
 * Error formaters.
 */
export const defaultErrors = {
  required: (error: any): string => `This field is required.`,
  minlength: ({requiredLength, actualLength}): string => {
    return `Expect ${requiredLength} but got ${actualLength}`;
  }
};

/**
 * Error formaters injected.
 */
export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});

/**
 * This is the component that displays errors.
 */
@Component({
  template: `<p class="help is-danger" [class.hide]="_hide">{{ _text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  text: string;
  hide = true;

  constructor(private cdr: ChangeDetectorRef) {
  }

  @Input() set text(value) {
    if (value !== this.text) {
      this.text = value;
      this.hide = !value;
      this.cdr.detectChanges();
    }
  }
}

@Directive({
  selector: '[controlErrorContainer]'
})
export class ControlErrorContainerDirective {
  constructor(public vcr: ViewContainerRef) { }
}

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

  constructor(private host: ElementRef<HTMLFormElement>) {
    console.log('FormSubmitDirective constructed');
  }

  get element() {
    return this.host.nativeElement;
  }
}

/**
 * It is applied to a form element to handle value changes
 * and manage error output.
 */
@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  submit$: Observable<Event> = EMPTY;
  container: ViewContainerRef;
  ref: ComponentRef<ControlErrorComponent>;

  constructor(
    public viewContainerRef: ViewContainerRef,
    @Optional() @Host() private form: FormSubmitDirective,

    private control: NgControl,
    private resolver: ComponentFactoryResolver,
    @Inject(FORM_ERRORS) private errors,
    @Optional() controlErrorContainer: ControlErrorContainerDirective
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.container = controlErrorContainer ? controlErrorContainer.vcr : this.viewContainerRef;
  }

  ngOnDestroy() {}

  ngOnInit() {
    console.log('firective ngOn');
    merge(
      this.submit$,
      this.control.valueChanges
    )
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        console.log('Validation event....');
        const controlErrors = this.control.errors;
        if (controlErrors) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.errors[firstKey];
          const text = getError(controlErrors[firstKey]);
          // //this.setError(text);
        }
      });
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }
}
