const fs = require('fs');
var Trie = require('dawg-lookup').Trie;

// iconv -f UTF-16 -t UTF-8 google_pinyin_rawdict_utf16_65105_freq.txt  > google_pinyin_rawdict_utf8_65105_freq.txt

const googlePinyin = fs.readFileSync('./google_pinyin_rawdict_utf8_65105_freq.txt', 'utf-8');
const pinyinList = [];
const lines = googlePinyin
  .split('\n')
  .filter(line => {
    return line.includes(' 0 '); //filter ' 1 ', which is 繁体
  })
  .map(function(line) {
    const pinyin = line.split(' 0 ')[1].replace(/\s/g, '');
    pinyinList.push(pinyin);
    return line.replace(' 0 ', '|');
  });

console.log('total words:', lines.length);

const trie = new Trie(pinyinList.join(' '));

const content = `
  exports.words = "${lines.join(';')}";
  exports.packedTrie = "${trie.pack()}";
`;
fs.writeFileSync('../pinyin/google_pinyin_dict_utf8_55320.js', content, 'utf-8');
