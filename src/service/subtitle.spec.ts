import {SubtitleService} from './subtitle';

describe('Subtitle service', () => {
  let subtitleService: SubtitleService;

  beforeEach(() => {
    subtitleService = new SubtitleService();
  });

  it('Filter', () => {
    const words = ['acrorn', '.', ',', '-', 'society'];
    const filteredWords = subtitleService.filterWords(words);
    expect(filteredWords.length).toEqual(2);
  });

  it('Test', () => {
    expect(true).toBeTruthy();
    const textSrt = `
1
00:01:11,720 --> 00:01:14,690
Apple pear orange bean
cherry nut berry dish.
radish orange apple.

2
00:01:14,800 --> 00:01:16,529
Nut berry dish radish.
Radish berry cherry bean
apple pear orange.

3
00:01:16,600 --> 00:01:18,728
Bean dish radish cherry.
Berry cherry orange bean.
`;
    const words = subtitleService.parse(textSrt);
    expect(words.length).toEqual(10);
  });

  it('Translate', async () => {
    const translation = await subtitleService.translate('bean');
    expect(translation).toEqual('бобы');
    const emptyTranslation = await subtitleService.translate('beans');
    expect(emptyTranslation).toBeUndefined();
  });

});