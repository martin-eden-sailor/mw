import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ITranslation, SubtitleService} from '../../service/subtitle';


@Component({
  selector: 'translate-page-component',
  styleUrls: ['style.sass'],
  templateUrl: './template.html'
})
export class TranslatePageComponent {
  translation: ITranslation;
  form: FormGroup;

  constructor(private fb: FormBuilder, private subtitleService: SubtitleService) {
    this.form = fb.group({
      word: fb.control('', [ Validators.required ]),
      equivalent: fb.control('', [ Validators.required ])
    });
  }

  public async translate(): Promise<string> {
    const word = this.form.get('word').value;

    const translation = await this.subtitleService.translate(word);
    this.form.get('equivalent').setValue(translation);

    return translation;
  }

  public clear() {
    this.form.get('word').setValue('');
  }

  public _translate() {
    this.translate();
  }

  save() {
    const word = this.form.get('word').value;
    const equivalent = this.form.get('equivalent').value;
    if (!!this.translation) {
      this.translation.word = word;
      this.translation.equivalent = equivalent;

      return;
    }

    this.translation = this.subtitleService.addWordEquivalent([word, equivalent]);
  }

}
