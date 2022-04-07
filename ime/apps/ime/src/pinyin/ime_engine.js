import { flatten, uniq } from 'lodash';
import { dict, packedTrie } from './google_pinyin_dict_utf8_55320.js';
const PTrie = require('dawg-lookup/lib/ptrie').PTrie;

const getCandidates = (trie, dict) => (input) => {
  let list = [];
  if (input) {
    const value = dict[input];
    if (value) {
      // full pinyin match, or abbr match.
      list = dict[input];
    } else if (input.length > 2) {
      // pinyin prefix match, using prepared packed trie data.
      list = flatten(trie.completions(input).map((key) => dict[key]));
    }

    //sort candidates by word frequency
    list = list
      .filter((item) => !!item)
      .sort((a, b) => b.f - a.f)
      .map((item) => item.w);
  }
  return uniq(list);
};

export default getCandidates(new PTrie(packedTrie), dict);
