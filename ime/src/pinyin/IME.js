import React, { PureComponent } from 'react';
import { AutoComplete } from 'antd';
import { throttle, flatten } from 'lodash';

import trie, { dict } from './trie.js';
import styles from './IME.module.css';

export default class Complete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      inputed: ''
    };
    this.getCandidatesThrottled = throttle(this.getCandidates, 200);
  }

  getCandidates = input => {
    input = input
      .trim()
      .toLowerCase()
      .replace(this.state.inputed, '');
    console.log('input', input, this.state.inputed);

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
    this.setState({
      inputed: this.state.inputed + value
    });
    console.log('onSelect', value);
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className={styles.inputBox}>
        <AutoComplete
          autoFocus
          dataSource={dataSource}
          style={{ width: 200 }}
          onSelect={this.onSelect}
          onSearch={this.getCandidatesThrottled}
          placeholder="请输入拼音"
        />
      </div>
    );
  }
}
