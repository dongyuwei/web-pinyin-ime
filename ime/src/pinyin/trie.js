import { flatten } from 'lodash';
import { words, packedTrie } from './google_pinyin_dict_utf8_55320.js';
const PTrie = require('dawg-lookup/lib/ptrie').PTrie;

const buildDict = words => {
  const dict = {};
  words.split(';').forEach(line => {
    // 帮 30125.3295903|bang
    // 西红柿 760.851466162|xi hong shi

    const arr = line.split('|');
    if (arr.length === 2) {
      const pinyin = arr[1].replace(/\s/g, '');
      const [word, frequency] = arr[0].split(' ');

      dict[pinyin] = dict[pinyin] || [];
      dict[pinyin].push({
        w: word,
        f: parseFloat(frequency)
      });
    }
  });

  return dict;
};

const getCandidates = (trie, dict) => input => {
  let list = [];
  if (input) {
    const value = dict[input];
    if (value) {
      list = dict[input].sort((a, b) => b.f - a.f).map(item => item.w);
    } else if (input.length > 2) {
      list = flatten(trie.completions(input).map(key => dict[key]))
        .sort((a, b) => b.f - a.f)
        .map(item => item.w);
    }
  }
  return list;
};

export default getCandidates(new PTrie(packedTrie), buildDict(words));
