# web-pinyin-ime

online pinyin input method

## online demo

https://dongyuwei.github.io/web-pinyin-ime/

If you would like to build and deploy to your own server, please change `"homepage": "https://dongyuwei.github.io/web-pinyin-ime/"` in `package.json` to `"/"` or your domain/subdomain.

## The pinyin dict source

https://android.googlesource.com/platform/packages/inputmethods/PinyinIME/+/refs/heads/master/jni/data/rawdict_utf16_65105_freq.txt
You can download the Android PinyinIME via this link: https://android.googlesource.com/platform/packages/inputmethods/PinyinIME/+archive/refs/heads/master.tar.gz

It is licensed under the **Apache License, Version 2.0**, see:
https://android.googlesource.com/platform/packages/inputmethods/PinyinIME/+/refs/heads/master/NOTICE

The `rawdict_utf16_65105_freq.txt` and `NOTICE` are included in `./ime/src/script` directory.

### The process of the pinyin dict:

- Convert the file to UTF-8 encoded: `iconv -f UTF-16 -t UTF-8 rawdict_utf16_65105_freq.txt > google_pinyin_rawdict_utf8_65105_freq.txt`
- Transform the dict to `./ime/src/pinyin/google_pinyin_dict_utf8_55320.js`, see the nodejs script: `./ime/src/script/dict_preprocess.js`
- Build a packed trie in the transform step. This enables pinyin prefix input.
- The final pinyin dict is `./ime/src/pinyin/google_pinyin_dict_utf8_55320.js`, which includes the transformed pinyin data and
  the prepared packed Trie.

## Dev prerequisite

- nodejs(tested with v14.17.0)
- pnpm(tested with 6.17.2)

Make sure you installed nodejs and yarn, then istall npm packages: `cd ime && pnpm install`

## For dev

- pnpm run dev

The core logic located in `./ime/src/pinyin/ime_engine.js` and `./ime/src/pinyin/IME.js`
If you make any changes, make sure to run `cd ime && yarn test`, see `./ime/src/pinyin/ime_engine.test.js`.

## Tests

see `./ime/src/pinyin/ime_engine.test.js`, 支持

- 全拼
- 首字母匹配
- 拼音前缀匹配

```js
import getCandidates from './ime_engine';

it('should get candidates with full pinyin', () => {
  expect(getCandidates('xihongshi')).toEqual(['西红柿']);
});

it('should get sorted candidates with abbr of pinyin(First chars of pinyin)', () => {
  // `xhs` maybe abbr of `xin hua she`, or `xi hong shi`, etc.
  expect(getCandidates('xhs')).toEqual([
    '新华社',
    '西红柿',
    '小和尚',
    '小护士',
    '巡回赛',
  ]);
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
    '西化',
  ]);

  expect(getCandidates('xiho')).toEqual(['西红柿']);
  expect(getCandidates('xihon')).toEqual(['西红柿']);
  expect(getCandidates('xihong')).toEqual(['西红柿']);
  expect(getCandidates('xihongs')).toEqual(['西红柿']);
  expect(getCandidates('xihongsh')).toEqual(['西红柿']);
  expect(getCandidates('xihongshi')).toEqual(['西红柿']);
});
```

## How to customize?

- You can build a customized UI using the existing pinyin input method engine(see `ime_engine.js`), there is only one simple API:
  `getCandidates(inputString)`

- You can get some inspiration from the reference implementation (The `IME` React Component in `IME.js`) and the unit test cases in `ime_engine.test.js`

## How to integrate with existing web page if you are happy with the current IME implementation?

There are at least two options:

- Include the built html(`yarn build`) via iframe.
- Mount/render the React `IME` component at expected/prepared DOM node. For example, render IME component to `div#pinyinImeContainer`
  `ReactDOM.render(<IME />, document.getElementById('pinyinImeContainer'))`. This option requires React js.
