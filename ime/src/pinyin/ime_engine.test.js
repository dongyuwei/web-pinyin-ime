import getCandidates from './ime_engine';

it('should get candidates with full pinyin', () => {
  expect(getCandidates('xihongshi')).toEqual(['西红柿']);
});

it('should get sorted candidates with abbr of pinyin(First chars of pinyin)', () => {
  // `xhs` maybe abbr of `xin hua she`, or `xi hong shi`, etc.
  expect(getCandidates('xhs')).toEqual(['新华社', '西红柿', '小和尚', '小护士', '巡回赛']);
});

it('should get sorted candidates with pinyin prefix', () => {
  // `xih` maybe prefix of `xi huan`, or `xi huan ni`, or `xi hong shi`, etc.
  expect(getCandidates('xih')).toEqual([
    '喜欢',
    '喜欢你',
    '西湖',
    '喜好',
    '细化',
    '西红柿',
    '喜欢吃',
    '稀罕',
    '喜欢听',
    '熄火',
    '西汉',
    '洗好',
    '嘻哈',
    '喜获',
    '喜欢什么',
    '喜欢自己',
    '西海岸',
    '西化'
  ]);

  expect(getCandidates('xiho')).toEqual(['西红柿']);
  expect(getCandidates('xihon')).toEqual(['西红柿']);
  expect(getCandidates('xihong')).toEqual(['西红柿']);
  expect(getCandidates('xihongs')).toEqual(['西红柿']);
  expect(getCandidates('xihongsh')).toEqual(['西红柿']);
  expect(getCandidates('xihongshi')).toEqual(['西红柿']);
});
