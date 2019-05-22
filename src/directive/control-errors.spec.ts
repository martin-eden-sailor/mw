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
    <form [formGroup]="form" controlErrorContainer (ngSubmit)="onSubmit($event)">
      <div class="field">
        <div class="control">
          <input type="text" class="input" formControlName="name" placeholder="name">
        </div>
      </div>
      <div class="control" (click)="click()">
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
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]]
    });
  }

  click() {
    console.log('Clicked...');
  }

  onSubmit($event) {
    console.log('onSubmit...');
    $event.preventDefault();
  }
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

  it('test', () => {
    const fixture = TestBed.createComponent(TestFormComponent);
    const app: TestFormComponent = fixture.debugElement.componentInstance;
    app.ngOnInit();

    // The test component is created.
    expect(app).toBeTruthy();

    const componentDe = fixture.debugElement;
    const componentEl: HTMLElement = componentDe.nativeElement;
    app.formSubmitDirective.submit$.subscribe((data) => {
      console.log('submitted', data);
    });

    const form = componentDe.query(By.css('form'));
    console.log('Form is invalid...', app.form.invalid);
    console.log(form);
    form.triggerEventHandler('ngSubmit', null);

    // componentDe.query(By.css('button')).triggerEventHandler('click', null);
    const submitBtn: HTMLElement = componentEl.querySelector('button');
    // console.log();
    //submitBtn.click();
   //  fixture.detectChanges();
    //console.log(app.formSubmitDirective);
  });
});