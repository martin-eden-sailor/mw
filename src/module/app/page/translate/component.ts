import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubtitleService} from '../../service/subtitle';


@Component({
  selector: 'translate-page-component',
  styleUrls: ['style.sass'],
  templateUrl: './template.html'
})
export class TranslatePageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private subtitleService: SubtitleService) {
    this.form = fb.group({
      word: fb.control('', [ Validators.required ]),
      translation: fb.control('', [ Validators.required ])
    });
  };

  public async translate(): Promise<string> {
    const word = this.form.get('word').value;
    const translation = await this.subtitleService.translate(word);
    this.form.get('translation').setValue(translation);

    return translation;
  }
}