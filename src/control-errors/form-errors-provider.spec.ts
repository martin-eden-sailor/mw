import {TestBed} from '@angular/core/testing';
import {defaultErrors, FORM_ERRORS} from './form-errors-provider';


describe('Form errors provider', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{
        provide: FORM_ERRORS,
        useValue: defaultErrors
      }]
    })
      .compileComponents();
  });

  it('Checks error text', () => {
    const service = TestBed.get(FORM_ERRORS);
    const requiredMessage = service.required();
    expect(requiredMessage).toEqual('This field is required.');
    const minlengthMessage = service.minlength({requiredLength: 5, actualLength: 3});
    expect(minlengthMessage).toEqual('Expect 5 but got 3');
  });

});
