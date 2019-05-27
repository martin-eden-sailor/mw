import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TestBed} from '@angular/core/testing';
import {FormSubmitDirective,} from './form-submit-directive';
import {ControlErrorsDirective} from './control-errors-directive';
import {defaultErrors, FORM_ERRORS} from './form-errors-provider';
import {ControlErrorComponent} from './control-error-component';

@Component({
  selector: 'test-form-component',
  template: `
    <form [formGroup]="form" controlErrorContainer>
      <div class="field">
        <div class="control">
          <input type="text" class="input" formControlName="name" placeholder="name">
        </div>
      </div>
      <div class="control">
        <button type="submit" class="button is-link is-small">Submit</button>
      </div>
    </form>
  `
})
class TestFormComponent implements  OnInit {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,

  ) {
    this.form = this.builder.group({
      name: ['default value', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]]
    });
  }

  ngOnInit() {
  }
}

describe('Control errors directive', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [{
        provide: FORM_ERRORS,
        useValue: defaultErrors
      }],
      declarations: [
        ControlErrorsDirective,
        ControlErrorComponent,
        TestFormComponent
      ]
    }).compileComponents();
  });

  it('Message output.', async () => {
    const fixture = TestBed.createComponent(TestFormComponent);
    const app: TestFormComponent = fixture.debugElement.componentInstance;
    const componentDe = fixture.debugElement;
    const componentEl: HTMLElement = componentDe.nativeElement;
    app.ngOnInit();

    // The test component is created.
    expect(app).toBeTruthy();

    app.form.get('name').setValue('new', {emitEvent: true});
    fixture.detectChanges();
    expect(app.form.get('name').errors['minlength']).toBeDefined();
    // @todo Validation subscriber is not called.

    const submitBtn: HTMLElement = componentEl.querySelector('button');
    submitBtn.click();
  });
});
