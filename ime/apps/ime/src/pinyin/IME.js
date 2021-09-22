import React, { PureComponent } from 'react';
import { AutoComplete, Input, Button } from 'antd';
import { throttle } from 'lodash';

import getCandidates from './ime_engine.js';
import styles from './IME.module.css';

const { TextArea } = Input;
const Max_Candidates = 50;

export default class IME extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      value: '',
      rawInput: '',
      currentInput: '',
    };

    this.getCandidatesThrottled = throttle(this.getCandidates, 100);
  }

  getCandidates = (rawInput) => {
    const arr = rawInput
      .trim()
      .toLowerCase()
      .replace(/[^\x00-\x7F]/g, '') // remove chinese characters.
      .replace(/[^\w\s]|_/g, ' ') // replace punctuation such as `,.?'"` with space.
      .split(' ');

    const input = arr[arr.length - 1]; // only use the last pinyin characters as actual input to get candidates.

    this.setState({
      rawInput,
      currentInput: input,
    });

    if (input) {
      this.setState({
        dataSource: getCandidates(input).slice(0, Max_Candidates),
      });
    } else {
      this.setState({
        dataSource: [],
      });
    }
  };

  onSelect = (value) => {
    this.setState({
      // we must keep the raw input, includes existing Chinese characters and all punctuations and space.
      value: this.state.rawInput.replace(this.state.currentInput, value),
    });
  };

  onChange = (value) => {
    this.setState({ value });
  };

  copyText = () => {
    if (this.inputEl) {
      const textAreaRef = this.inputEl.textAreaRef;

      textAreaRef.select();
      textAreaRef.setSelectionRange(0, 99999);
      document.execCommand('copy');
    }
  };

  render() {
    const { value, dataSource } = this.state;
    return (
      <div className={styles.inputBox}>
        <AutoComplete
          value={value}
          dataSource={dataSource}
          style={{ width: 400 }}
          onSelect={this.onSelect}
          onSearch={this.getCandidatesThrottled}
          onChange={this.onChange}
        >
          <TextArea
            placeholder="Please input Chinese pinyin 请输入拼音"
            style={{ height: 77 }}
            ref={(inputEl) => {
              this.inputEl = inputEl;
            }}
          />
        </AutoComplete>
        <Button onClick={this.copyText} className={styles.btn}>
          Copy Text
        </Button>
      </div>
    );
  }
}
