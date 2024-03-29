import {Injectable} from '@angular/core';
import * as parser from 'subtitles-parser';
import * as _ from 'lodash';
import * as pos from 'pos';
import * as uuid from 'uuid';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type IWordPair = [string, string];

export interface ITranslation {
  uuid: string;
  word: string;
  equivalent: string;
}

@Injectable()
export class SubtitleService {
  private wordTranslations: ITranslation[];

  constructor(
      private http: HttpClient
  ) {
    this.wordTranslations = [];
  }

  public addWordEquivalent(pair: IWordPair): ITranslation {
    const translation: ITranslation = {
      uuid: uuid.v4(),
      word: pair[0],
      equivalent: pair[1]
    };

    this.wordTranslations.push(translation);

    return translation;
  }

  public getWordTranslatiobById(_uuid: string): ITranslation | undefined {
    return this.wordTranslations.find((wordTranslation) => wordTranslation.uuid === _uuid);
  }

  public getWordTranslations(): ITranslation[] {
    return this.wordTranslations;
  }

  public parse(srtText) {
    var data = parser.fromSrt(srtText);
    let text = _.join(_.map(data, 'text'), ' ');

    let words = new pos.Lexer().lex(text);
    let tagger = new pos.Tagger();
    let taggedWords = tagger.tag(words);


    let u = _.chain(taggedWords)
      .map(0)
      .map(a => a.toLowerCase())
      .uniq()
      .sort()
      .value();

    return u;
  }

  public filterWords(words) {
    const stopWords = ['.', ',', '-'];
    return words.filter((word) => stopWords.indexOf(word) === -1);
  }

  public async translate(word: string): Promise<string> {
    const pair = [
      ['apple', 'яблоко'],
      ['pear', 'груша'],
      ['orange', 'апельсин'],
      ['bean', 'бобы'],
      ['cherry', 'вишня'],
      ['nut', 'орех'],
      ['berry', 'ягода'],
      ['dish', 'блюдо'],
      ['radish', 'редиска']
    ].find((translationPair) =>  translationPair[0] === word);

    if (pair) {
      return Promise.resolve(pair[1]);
    }

    return Promise.resolve(undefined);
  }

  public gTranslate(word: string): Observable<any> {
    return this.http.post('https://translation.googleapis.com/language/translate/v2', {
      q: word,
      target: 'ru'
    })
      .pipe(
        map(d => {
          return d;
        })
      );
  }
}
