import React, { PureComponent } from 'react';
import { AutoComplete, Input, Button } from 'antd';
import { throttle } from 'lodash';

import getCandidates from './trie.js';
import styles from './IME.module.css';

const { TextArea } = Input;
const Max_Candidates = 50;

export default class Complete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      value: '',
      rawInput: '',
      currentInput: ''
    };
    this.getCandidatesThrottled = throttle(this.getCandidates, 100);
  }

  getCandidates = rawInput => {
    const input = rawInput
      .trim()
      .toLowerCase()
      .replace(/[^\x00-\x7F]/g, '')
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, '');

    this.setState({
      rawInput,
      currentInput: input
    });

    if (input) {
      this.setState({
        dataSource: getCandidates(input).slice(0, Max_Candidates)
      });
    } else {
      this.setState({
        dataSource: []
      });
    }
  };

  onSelect = value => {
    this.setState({
      value: this.state.rawInput.replace(this.state.currentInput, value)
    });
  };

  onChange = value => {
    this.setState({ value });
  };

  copyText = () => {
    if (this.inputEl) {
      console.log('aa', this.inputEl);
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
            ref={inputEl => {
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
