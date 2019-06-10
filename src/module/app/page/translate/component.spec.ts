import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslatePageComponent} from './component';
import {MaterialModule} from '../../../material';
import {SubtitleService} from '../../service/subtitle';


describe('Translate Page Component', () => {
  let fixture: ComponentFixture<TranslatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SubtitleService
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule
      ],
      declarations: [
        TranslatePageComponent
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TranslatePageComponent);
  });

  it('Component is created.', () => {
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Translate', async () => {
    const component: TranslatePageComponent = fixture.debugElement.componentInstance;
    component.form.get('word').setValue('bean');
    const translationA = await component.translate();
    const translationB = component.form.get('translation').value;
    expect(translationA).toEqual(translationB);
    expect(translationB).toEqual('бобы');
  });

});