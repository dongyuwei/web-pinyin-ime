import { PureComponent } from 'react';
import { AutoComplete, Input } from 'antd';
import { throttle } from 'lodash';

import getCandidates from './ime_engine';
import styles from './IME.module.css';

const { TextArea } = Input;
const Max_Candidates = 50;

interface IOption {
  label: string;
  value: string;
}

interface iProps {}
interface IState {
  options: IOption[];
  value: string;
  rawInput: string;
  currentInput: string;
}

export default class IME extends PureComponent<iProps, IState> {
  getCandidatesThrottled: any;
  constructor(props: iProps) {
    super(props);

    this.state = {
      options: [],
      value: '',
      rawInput: '',
      currentInput: '',
    };

    this.getCandidatesThrottled = throttle(this.getCandidates, 100);
  }

  getCandidates = (rawInput: string) => {
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
        options: getCandidates(input)
          .slice(0, Max_Candidates)
          .map((word: string) => ({
            label: word,
            value: word,
          })),
      });
    } else {
      this.setState({
        options: [],
      });
    }
  };

  onSelect = (value: string, _option: object): any => {
    this.setState({
      // we must keep the raw input, includes existing Chinese characters and all punctuations and space.
      value: this.state.rawInput.replace(this.state.currentInput, value),
    });
  };

  onChange = (value: string) => {
    this.setState({ value });
  };

  render() {
    const { value, options } = this.state;
    return (
      <div className={styles.inputBox}>
        <AutoComplete
          value={value}
          options={options}
          style={{ width: 400 }}
          onSelect={this.onSelect}
          onSearch={this.getCandidatesThrottled}
          onChange={this.onChange}
        >
          <TextArea
            placeholder='Please input Chinese pinyin 请输入拼音'
            style={{ height: 77 }}
          />
        </AutoComplete>
      </div>
    );
  }
}
