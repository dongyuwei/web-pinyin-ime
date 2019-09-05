# web-pinyin-ime

online pinyin input method

## The pinyin dict source

https://android.googlesource.com/platform/packages/inputmethods/PinyinIME/+/refs/heads/master/jni/data/rawdict_utf16_65105_freq.txt
You can download the Android PinyinIME via this link: https://android.googlesource.com/platform/packages/inputmethods/PinyinIME/+archive/refs/heads/master.tar.gz

It is licensed under the **Apache License, Version 2.0**, see:
https://android.googlesource.com/platform/packages/inputmethods/PinyinIME/+/refs/heads/master/NOTICE

The `rawdict_utf16_65105_freq.txt` and `NOTICE` are included in `./ime/src/script` directory.

### The process of the pinyin dict:

- Convert the file to UTF-8 encoded: `iconv -f UTF-16 -t UTF-8 rawdict_utf16_65105_freq.txt > google_pinyin_rawdict_utf8_65105_freq.txt`
- Transform the dict to `./ime/src/pinyin/google_pinyin_dict_utf8_55320.js`
- Build a packed trie in the transform step. This enables pinyin prefix input.

## For dev, see `./ime/README.md`

The main logic located in `./ime/src/pinyin/IME.js` and `./ime/src/pinyin/ime_engine.js`.
If you make any changes, make sure to run `cd ime && yarn test`.
