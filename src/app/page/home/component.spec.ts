import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../module/material';
import {SubtitleService} from '../../../service/subtitle';
import {HomePageComponent} from './component';


describe('Home Page Component', () => {
  let fixture: ComponentFixture<HomePageComponent>;

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
        HomePageComponent
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HomePageComponent);
  });

  it('Component is created.', () => {
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

});