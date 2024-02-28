import { PinyinTokenizer } from './pinyin_tokenizer';
it('should split pinyin', () => {
  const tokenizer = new PinyinTokenizer();
  const [words, invalidWords] = tokenizer.tokenize('jintianxtianqibucuo');
  expect(words).toEqual(['jin', 'tian', 'tian', 'qi', 'bu', 'cuo']);
  expect(invalidWords).toEqual(['x']);
});

it('should split pinyin, case2', () => {
  const tokenizer = new PinyinTokenizer();
  const [words, invalidWords] = tokenizer.tokenize('wosizhongguoren');
  expect(words).toEqual(['wo', 'si', 'zhong', 'guo', 'ren']);
  expect(invalidWords).toEqual([]);

  const [words2, invalidWords2] = tokenizer.tokenize('woshizhongguoren');
  expect(words2).toEqual(['wo', 'shi', 'zhong', 'guo', 'ren']);
  expect(invalidWords2).toEqual([]);

  const [words3, invalidWords3] = tokenizer.tokenize('nihaoshijie');
  expect(words3).toEqual(['ni', 'hao', 'shi', 'jie']);
  expect(invalidWords2).toEqual([]);
});
