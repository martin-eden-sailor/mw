import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ITranslation, SubtitleService} from '../../service/subtitle';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";


@Component({
  selector: 'translate-page-component',
  styleUrls: ['style.sass'],
  templateUrl: './template.html'
})
export class TranslatePageComponent {
  translation: ITranslation;
  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private subtitleService: SubtitleService,
      private http: HttpClient
  ) {
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
    const word = this.form.get('word').value;
    const from = 'en';
    const to = 'ru';
    this.http.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${word};`)
      .pipe(
        map(d => d[0][0][0].replace(';', ''))
      )
      .subscribe((equivalent) => {
        this.form.get('equivalent').setValue(equivalent);
      });
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
