import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TestBed} from '@angular/core/testing';
import {FormSubmitDirective,} from './form-submit';

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

  @ViewChild(FormSubmitDirective)
  public formSubmitDirective: FormSubmitDirective;

  constructor(
    private builder: FormBuilder,

  ) {
    this.form = this.builder.group({
      name: ['default value', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]]
    });
  }

  ngOnInit() {
  }
}

describe('Form submit directive', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        TestFormComponent,
        FormSubmitDirective
      ]
    }).compileComponents();
  });

  it('Submission event handling.', async () => {
    const fixture = TestBed.createComponent(TestFormComponent);
    const app: TestFormComponent = fixture.debugElement.componentInstance;
    const componentDe = fixture.debugElement;
    const componentEl: HTMLElement = componentDe.nativeElement;
    app.ngOnInit();

    // The test component is created.
    expect(app).toBeTruthy();

    app.form.get('name').setValue('new value');
    fixture.detectChanges();
    expect(app.form.get('name').value).toEqual('new value');

    const submitBtn: HTMLElement = componentEl.querySelector('button');
    let submissionValue = 'None';
    const toSetSumissionValue = 'Submitted1';
    app.formSubmitDirective.submit$.subscribe((data) => {
      submissionValue = toSetSumissionValue;
      console.log(submissionValue);
    });
    submitBtn.click();

    // Submission event was triggered.
    expect(submissionValue).toEqual(toSetSumissionValue);

    // Form is marked as submitted.
    const form: HTMLElement = componentEl.querySelector('form');
    expect(form.classList.contains('submitted')).toBeTruthy();
  });
});
