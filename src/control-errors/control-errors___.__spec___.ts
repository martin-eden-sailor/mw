import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TestBed} from '@angular/core/testing';
import {
  ControlErrorComponent,
  ControlErrorContainerDirective,
  ControlErrorsDirective,
  FormSubmitDirective
} from './control-errors';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'test-form-component',
  template: `
    <form [formGroup]="form" controlErrorContainer (ngSubmit)="onSubmit()">
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

  @ViewChild(FormSubmitDirective)
  public formSubmitDirective: FormSubmitDirective;

  constructor(
    private builder: FormBuilder,

  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      name: ['a', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]]
    });
  }

  onSubmit() {}
}


describe('Control Errors', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        TestFormComponent,
        ControlErrorComponent,
        ControlErrorsDirective,
        ControlErrorContainerDirective,
        FormSubmitDirective
      ]
    }).compileComponents();
  });

  it('test', async () => {
    const fixture = TestBed.createComponent(TestFormComponent);
    const app: TestFormComponent = fixture.debugElement.componentInstance;
    app.ngOnInit();

    // The test component is created.
    expect(app).toBeTruthy();

    const componentDe = fixture.debugElement;
    const componentEl: HTMLElement = componentDe.nativeElement;
    let submissionValue = 'None';
    let toSetSumissionValue = 'Submitted1'
    app.formSubmitDirective.submit$.subscribe((data) => {
      submissionValue = toSetSumissionValue;
    });
    expect(app.form.invalid).toBeTruthy();
    app.form.get('name').setValue('new value');
    expect(app.form.get('name').value).toEqual('new value');
    const submitBtn: HTMLElement = componentEl.querySelector('button');
    submitBtn.click();
    expect(submissionValue).toEqual(toSetSumissionValue);
    const form: HTMLElement = componentEl.querySelector('form');
    expect(form.classList.contains('submitted')).toBeTruthy();
  });
});
