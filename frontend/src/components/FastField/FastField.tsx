import React, { Component } from 'react';
import { Input } from 'antd';

interface IProps {
  onBlur: (value: string) => void;
  placeholder: string;
}

export default class FastField extends Component<IProps> {
  state = {
    value: '',
  };

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <>
        <Input
          type="text"
          name="value"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            this.setState({ [e.target.name]: e.target.value });
          }}
          onBlur={(event) => this.props.onBlur(event.target.value)}
        />
      </>
    );
  }
}
