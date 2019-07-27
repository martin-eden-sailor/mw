import {TestBed} from '@angular/core/testing';
import {ControlErrorComponent} from './control-error-component';


describe('Control error component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlErrorComponent]
    })
      .compileComponents();
  });

  it('Message output', () => {
    const fixture = TestBed.createComponent(ControlErrorComponent);
    const nativeEl: HTMLElement = fixture.debugElement.nativeElement;
    const component: ControlErrorComponent = fixture.debugElement.componentInstance;
    component.text = 'Error Message';
    fixture.detectChanges();
    const messageEl = nativeEl.querySelector('p.help');
    expect(messageEl.classList.contains('hide')).toBeFalsy();
    component.text = false;
    fixture.detectChanges();
    expect(messageEl.classList.contains('hide')).toBeTruthy();
  });
});
