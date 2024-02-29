// Ported from https://github.com/shibing624/pinyin-tokenizer/blob/0.0.2/pinyintokenizer/__init__.py, with ChatGPT4's help.

import { syllables } from './pinyin_syllables';
class PinyinTrieNode {
  key: string;
  end: boolean;
  children: { [key: string]: PinyinTrieNode };

  constructor(key: string = '', seq: string[] = []) {
    this.key = key;
    this.end = seq.length === 0;
    this.children = {};
    if (seq.length > 0) {
      this.children[seq[0]] = new PinyinTrieNode(seq[0], seq.slice(1));
    }
  }

  add(seq: string[]): void {
    if (seq.length === 0) {
      this.end = true;
    } else {
      const key = seq[0];
      const value = seq.slice(1);
      if (this.children[key]) {
        this.children[key].add(value);
      } else {
        this.children[key] = new PinyinTrieNode(key, value);
      }
    }
  }

  find(sent: string): [string, boolean] {
    for (let i = 0; i < sent.length; i++) {
      const size = sent.length - i;
      const key = sent.substring(0, size);
      if (this.children[key]) {
        const [buf, succ] = this.children[key].find(sent.substring(size));
        if (succ) {
          return [key + buf, true];
        }
      }
    }
    return ['', this.end];
  }
}

export class PinyinTokenizer {
  private root: PinyinTrieNode;

  constructor() {
    this.root = new PinyinTrieNode();
    this.root.end = false;
    this.setup();
  }

  private add(seq: string[]): void {
    this.root.add(seq);
  }

  private setup(): void {
    syllables.forEach((syl) => {
      this.add(syl.split(''));
    });
  }

  public tokenize(sentence: string): [string[], string[]] {
    let words: string[] = [];
    let invalidWords: string[] = [];
    while (sentence.length > 0) {
      const [buf, succ] = this.root.find(sentence);
      if (succ) {
        words.push(buf);
        sentence = sentence.substring(buf.length);
      } else {
        invalidWords.push(sentence[0]);
        sentence = sentence.substring(1);
      }
    }
    return [words, invalidWords];
  }
}
