import Trie from 'node-ternary-search-trie';

import content from './google_pinyin_dict_utf8_55320.js';

export const dict = {};
const trie = new Trie();

const buildTrie = content => {
  content.split(';').forEach(line => {
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

  for (const key in dict) {
    trie.set(key, key);
  }

  return trie;
};

export default buildTrie(content);
