const fs = require('fs');
// iconv -f UTF-16 -t UTF-8 google_pinyin_rawdict_utf16_65105_freq.txt  > google_pinyin_rawdict_utf8_65105_freq.txt

const googlePinyin = fs.readFileSync('./google_pinyin_rawdict_utf8_65105_freq.txt', 'utf-8');
const lines = googlePinyin
  .split('\n')
  .filter(line => {
    return line.includes(' 0 '); //filter ' 1 ', which is 繁体
  })
  .map(function(line) {
    return line.replace(' 0 ', '|');
  });

const content = `module.exports = "${lines.join(';')}"`;
fs.writeFileSync('google_pinyin_dict_utf8_65105.js', content, 'utf-8');
