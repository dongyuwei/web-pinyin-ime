const fs = require('fs');
var Trie = require('dawg-lookup').Trie;

// iconv -f UTF-16 -t UTF-8 rawdict_utf16_65105_freq.txt  > google_pinyin_rawdict_utf8_65105_freq.txt

const googlePinyin = fs.readFileSync(
  './google_pinyin_rawdict_utf8_65105_freq.txt',
  'utf-8'
);
const pinyinList = [];
const lines = googlePinyin
  .split('\n')
  .filter((line) => {
    return line.includes(' 0 '); // ' 0 ' means simplified chinese characters', while ' 1 ' means traditional chinese characters.
  })
  .map(function (line) {
    const pinyin = line.split(' 0 ')[1].replace(/\s/g, '');
    pinyinList.push(pinyin);
    return line.replace(' 0 ', '|');
  });

console.log('total words:', lines.length);

const buildDict = () => {
  const dict = {};
  lines.forEach((line) => {
    // 帮 30125.3295903|bang
    // 西红柿 760.851466162|xi hong shi

    const arr = line.split('|');
    if (arr.length === 2) {
      //abbr is the first chars of the pinyin, eg: `xhs` is abbr of `xi hong shi`
      const abbr = arr[1]
        .split(' ')
        .map((item) => item.substring(0, 1))
        .join('');

      const pinyin = arr[1].replace(/\s/g, '');
      const [word, frequency] = arr[0].split(' ');

      const value = {
        w: word,
        f: parseFloat(frequency),
      };
      dict[pinyin] = dict[pinyin] || [];
      dict[pinyin].push(value);
      if (abbr.length >= 2) {
        dict[abbr] = dict[abbr] || [];
        dict[abbr].push(value);
      }
    }
  });

  return dict;
};

const trie = new Trie(pinyinList.join(' '));

const content = `
  export const dict = ${JSON.stringify(buildDict())};
  export const packedTrie = "${trie.pack()}";
`;

fs.writeFileSync(
  '../pinyin/google_pinyin_dict_utf8_55320.ts',
  content,
  'utf-8'
);
