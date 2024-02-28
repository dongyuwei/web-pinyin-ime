// Ported from https://github.com/shibing624/pinyin-tokenizer/blob/0.0.2/pinyintokenizer/__init__.py, with ChatGPT4's help.
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

const syllables = [
  'a',
  'ai',
  'an',
  'ang',
  'ao',
  'e',
  'ei',
  'en',
  'er',
  'o',
  'ou',
  'ba',
  'bai',
  'ban',
  'bang',
  'bao',
  'bei',
  'ben',
  'beng',
  'bi',
  'bian',
  'biao',
  'bie',
  'bin',
  'bing',
  'bo',
  'bu',
  'ca',
  'cai',
  'can',
  'cang',
  'cao',
  'ce',
  'cen',
  'ceng',
  'ci',
  'cong',
  'cou',
  'cu',
  'cuan',
  'cui',
  'cun',
  'cuo',
  'cha',
  'chai',
  'chan',
  'chang',
  'chao',
  'che',
  'chen',
  'cheng',
  'chi',
  'chong',
  'chou',
  'chu',
  'chuai',
  'chuan',
  'chuang',
  'chui',
  'chun',
  'chuo',
  'da',
  'dai',
  'dan',
  'dang',
  'dao',
  'de',
  'deng',
  'di',
  'dia',
  'dian',
  'diao',
  'die',
  'ding',
  'diu',
  'dong',
  'dou',
  'du',
  'duan',
  'dui',
  'dun',
  'duo',
  'fa',
  'fan',
  'fang',
  'fei',
  'fen',
  'feng',
  'fo',
  'fou',
  'fu',
  'ga',
  'gai',
  'gan',
  'gang',
  'gao',
  'ge',
  'gei',
  'gen',
  'geng',
  'gong',
  'gou',
  'gu',
  'gua',
  'guai',
  'guan',
  'guang',
  'gui',
  'gun',
  'guo',
  'ha',
  'hai',
  'han',
  'hang',
  'hao',
  'he',
  'hei',
  'hen',
  'heng',
  'hong',
  'hou',
  'hu',
  'hua',
  'huai',
  'huan',
  'huang',
  'hui',
  'hun',
  'huo',
  'ji',
  'jia',
  'jian',
  'jiang',
  'jiao',
  'jie',
  'jin',
  'jing',
  'jiong',
  'jiu',
  'ju',
  'juan',
  'jue',
  'jun',
  'ka',
  'kai',
  'kan',
  'kang',
  'kao',
  'ke',
  'ken',
  'keng',
  'kong',
  'kou',
  'ku',
  'kua',
  'kuai',
  'kuan',
  'kuang',
  'kui',
  'kun',
  'kuo',
  'la',
  'lai',
  'lan',
  'lang',
  'lao',
  'le',
  'lei',
  'leng',
  'li',
  'lia',
  'lian',
  'liang',
  'liao',
  'lie',
  'lin',
  'ling',
  'liu',
  'long',
  'lou',
  'lu',
  'lu:',
  'lv',
  'lue',
  'lve',
  'luan',
  'lun',
  'luo',
  'm',
  'ma',
  'mai',
  'man',
  'mang',
  'mao',
  'me',
  'mei',
  'men',
  'meng',
  'mi',
  'mian',
  'miao',
  'mie',
  'min',
  'ming',
  'miu',
  'mo',
  'mou',
  'mu',
  'na',
  'nai',
  'nan',
  'nang',
  'nao',
  'ne',
  'nei',
  'nen',
  'neng',
  'ng',
  'ni',
  'nian',
  'niang',
  'niao',
  'nie',
  'nin',
  'ning',
  'niu',
  'nong',
  'nou',
  'nu',
  'nu:',
  'nue',
  'nv',
  'nve',
  'nuan',
  'nuo',
  'pa',
  'pai',
  'pan',
  'pang',
  'pao',
  'pei',
  'pen',
  'peng',
  'pi',
  'pian',
  'piao',
  'pie',
  'pin',
  'ping',
  'po',
  'pou',
  'pu',
  'qi',
  'qia',
  'qian',
  'qiang',
  'qiao',
  'qie',
  'qin',
  'qing',
  'qiong',
  'qiu',
  'qu',
  'quan',
  'que',
  'qun',
  'ran',
  'rang',
  'rao',
  're',
  'ren',
  'reng',
  'ri',
  'rong',
  'rou',
  'ru',
  'ruan',
  'rui',
  'run',
  'ruo',
  'sa',
  'sai',
  'san',
  'sang',
  'sao',
  'se',
  'sen',
  'seng',
  'si',
  'song',
  'sou',
  'su',
  'suan',
  'sui',
  'sun',
  'suo',
  'sha',
  'shai',
  'shan',
  'shang',
  'shao',
  'she',
  'shei',
  'shen',
  'sheng',
  'shi',
  'shou',
  'shu',
  'shua',
  'shuai',
  'shuan',
  'shuang',
  'shui',
  'shun',
  'shuo',
  'ta',
  'tai',
  'tan',
  'tang',
  'tao',
  'te',
  'teng',
  'ti',
  'tian',
  'tiao',
  'tie',
  'ting',
  'tong',
  'tou',
  'tu',
  'tuan',
  'tui',
  'tun',
  'tuo',
  'wa',
  'wai',
  'wan',
  'wang',
  'wei',
  'wen',
  'weng',
  'wo',
  'wu',
  'xi',
  'xia',
  'xian',
  'xiang',
  'xiao',
  'xie',
  'xin',
  'xing',
  'xiong',
  'xiu',
  'xu',
  'xuan',
  'xue',
  'xun',
  'ya',
  'yan',
  'yang',
  'yao',
  'ye',
  'yi',
  'yiao',
  'yin',
  'ying',
  'yo',
  'yong',
  'you',
  'yu',
  'yuan',
  'yue',
  'yun',
  'za',
  'zai',
  'zan',
  'zang',
  'zao',
  'ze',
  'zei',
  'zen',
  'zeng',
  'zi',
  'zong',
  'zou',
  'zu',
  'zuan',
  'zui',
  'zun',
  'zuo',
  'zha',
  'zhai',
  'zhan',
  'zhang',
  'zhao',
  'zhe',
  'zhen',
  'zheng',
  'zhi',
  'zhong',
  'zhou',
  'zhu',
  'zhua',
  'zhuai',
  'zhuan',
  'zhuang',
  'zhui',
  'zhun',
  'zhuo',
];

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

  public tokenize(sent: string): [string[], string[]] {
    let words: string[] = [];
    let invalidWords: string[] = [];
    while (sent.length > 0) {
      const [buf, succ] = this.root.find(sent);
      if (succ) {
        words.push(buf);
        sent = sent.substring(buf.length);
      } else {
        invalidWords.push(sent[0]);
        sent = sent.substring(1);
      }
    }
    return [words, invalidWords];
  }
}

/* Example usage
const tokenizer = new PinyinTokenizer();
const [words, invalidWords] = tokenizer.tokenize('jintianxtianqibucuo');
console.log('Words:', words);
console.log('Invalid Words:', invalidWords);
*/
