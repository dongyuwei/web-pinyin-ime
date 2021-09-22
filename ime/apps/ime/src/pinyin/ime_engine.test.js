import getCandidates from './ime_engine';

it('should get candidates with key', () => {
  expect(getCandidates('key')).toEqual([
    '可以',     '可以用',   '可以通过', '可用',     '可以看到',
    '科研',     '可以说是', '刻意',     '可以看出', '可以选择',
    '可以使用', '可以直接', '可以根据', '可以考虑', '可以理解',
    '可疑',     '客运',     '可以吗',   '可以得到', '可以实现',
    '可言',     '可以帮助', '可以获得', '可以利用', '可以找到',
    '可以达到', '可要',     '可以随时', '可用于',   '可以接受',
    '可有',     '可以买',   '可以用来', '可以作为', '可以提供',
    '可以享受', '可以满足', '可以下载', '可以买到', '可与',
    '可用性',   '可以吃',   '可以看见', '科研成果', '客源',
    '可以分为', '可由',     '可以上网', '科研人员', '可以申请',
    '可以采用', '科研机构', '可以打',   '客运站',   '可以增加',
    '可以拿',   '科研院所', '科研项目', '可以换',   '可有可无',
    '科研工作', '课余',     '可以放',   '可以查看', '可以用于',
    '科员',     '可依',     '科研单位', '刻有',     '可以显示',
    '柯以敏'
  ]);
});

it('should get candidates with keyi', () => {
  expect(getCandidates('keyi')).toEqual([ '可以', '刻意', '可疑', '可依' ]);
});

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
