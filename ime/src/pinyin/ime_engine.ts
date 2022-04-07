import { flatten, uniq } from 'lodash';
import { dict, packedTrie } from './google_pinyin_dict_utf8_55320';
import { PTrie } from 'dawg-lookup/lib/ptrie';

interface IDict {
  [key: string]: IWord[];
}

export interface IWord {
  w: string;
  f: number;
}

const getCandidates =
  (trie: typeof PTrie, dict: IDict) =>
  (input: string): IWord[] => {
    let list: IWord[] = [];
    if (input) {
      const value: IWord[] = dict[input];
      if (value) {
        // full pinyin match, or abbr match.
        list = value;
      } else if (input.length > 2) {
        // pinyin prefix match, using prepared packed trie data.
        list = flatten(trie.completions(input).map((key: string) => dict[key]));
      }

      //sort candidates by word frequency
      list = list
        .filter((item: IWord) => !!item)
        .sort((a, b) => b.f - a.f)
        .map((item) => item.w);
    }
    return uniq(list);
  };

export default getCandidates(new PTrie(packedTrie), dict);
