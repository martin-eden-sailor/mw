import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Host, Inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewContainerRef
} from '@angular/core';
import {EMPTY, merge, Observable} from 'rxjs';
import {NgControl} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ControlErrorComponent} from './control-error-component';
import {FormSubmitDirective} from './form-submit-directive';
import {FORM_ERRORS} from './form-errors-provider';

@Directive({
  selector: '[controlErrorContainer]'
})
export class ControlErrorContainerDirective {
  constructor(public vcr: ViewContainerRef) { }
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
    merge(
      this.submit$,
      this.control.valueChanges
    )
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        const controlErrors = this.control.errors;
        if (controlErrors) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.errors[firstKey];
          const text = getError(controlErrors[firstKey]);
          this.setError(text);
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
