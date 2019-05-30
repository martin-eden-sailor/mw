import {Injectable} from '@angular/core';
import * as parser from 'subtitles-parser';
import * as _ from 'lodash';
import * as pos from 'pos';

@Injectable()
export class SubtitleService {
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
    console.log('service translate');

    if (pair) {
      return Promise.resolve(pair[1]);
    }

    return Promise.resolve(undefined);
  }
}
