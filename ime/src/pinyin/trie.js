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
      const abbr = arr[1]
        .split(' ')
        .map(item => item.substring(0, 1))
        .join('');

      const pinyin = arr[1].replace(/\s/g, '');
      const [word, frequency] = arr[0].split(' ');

      const value = {
        w: word,
        f: parseFloat(frequency)
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
