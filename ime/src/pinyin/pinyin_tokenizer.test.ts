import { PinyinTokenizer } from './pinyin_tokenizer';
it('should split pinyin', () => {
  const tokenizer = new PinyinTokenizer();
  const [words, invalidWords] = tokenizer.tokenize('jintianxtianqibucuo');
  expect(words).toEqual(['jin', 'tian', 'tian', 'qi', 'bu', 'cuo']);
  expect(invalidWords).toEqual(['x']);
});
