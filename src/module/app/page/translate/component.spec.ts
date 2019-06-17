import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslatePageComponent} from './component';
import {MaterialModule} from '../../../material';
import {SubtitleService} from '../../service/subtitle';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";


describe('Translate Page Component', () => {
  let fixture: ComponentFixture<TranslatePageComponent>;
  let clearBtnEl: DebugElement;
  let translateBtnEl: DebugElement;
  let saveBtnEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SubtitleService
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [
        TranslatePageComponent
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TranslatePageComponent);
    clearBtnEl = fixture.debugElement.query(By.css('button.clear'));
    translateBtnEl = fixture.debugElement.query(By.css('button.translate'));
    saveBtnEl = fixture.debugElement.query(By.css('button.save'));
  });

  it('Component is created.', () => {
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Translate', async () => {
    const component: TranslatePageComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(clearBtnEl.attributes['ng-reflect-disabled']).toBeTruthy();
    expect(translateBtnEl.attributes['ng-reflect-disabled']).toBeTruthy();
    expect(saveBtnEl.attributes['ng-reflect-disabled']).toBeTruthy();
    component.form.get('word').setValue('bean');
    fixture.detectChanges();
    expect(clearBtnEl.attributes['ng-reflect-disabled']).toBe('false');
    expect(translateBtnEl.attributes['ng-reflect-disabled']).toBe('false');
    const translationA = await component.translate();
    fixture.detectChanges();
    expect(saveBtnEl.attributes['ng-reflect-disabled']).toBe('false');
    const translationB = component.form.get('equivalent').value;
    expect(translationA).toEqual(translationB);
    expect(translationB).toEqual('бобы');
    expect(fixture.componentInstance.translation).toBeUndefined();
    expect(saveBtnEl.nativeElement.textContent).toEqual('Create');
    fixture.componentInstance.save();
    expect(fixture.componentInstance.translation).not.toBeUndefined();
    fixture.detectChanges();
    expect(saveBtnEl.nativeElement.textContent).toEqual('Save');
  });

});