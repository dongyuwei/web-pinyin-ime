import React, { PureComponent } from 'react';
import { AutoComplete, Input } from 'antd';
import { throttle, flatten } from 'lodash';

import trie, { dict } from './trie.js';
import styles from './IME.module.css';

const { TextArea } = Input;

export default class Complete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      inputed: '',
      value: ''
    };
    this.getCandidatesThrottled = throttle(this.getCandidates, 100);
  }

  getCandidates = input => {
    input = input
      .trim()
      .toLowerCase()
      .replace(/[^\x00-\x7F]/g, '')
      .replace(/\s/g, '');

    if (input) {
      let list = [];
      const value = dict[input];
      if (value) {
        list = dict[input].sort((a, b) => b.f - a.f).map(item => item.w);
      } else if (input.length > 2) {
        list = flatten(trie.keysWithPrefix(input).map(key => dict[key]))
          .sort((a, b) => b.f - a.f)
          .map(item => item.w);
      }

      this.setState({
        dataSource: list.slice(0, 50)
      });
    } else {
      this.setState({
        dataSource: []
      });
    }
  };

  onSelect = value => {
    this.setState(
      {
        inputed: this.state.inputed + value
      },
      () => {
        this.onChange(this.state.inputed);
      }
    );
  };

  onChange = value => {
    this.setState({ value });
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
          <TextArea placeholder="请输入拼音" style={{ height: 77 }} />
        </AutoComplete>
      </div>
    );
  }
}
