import React from 'react';
import { Form, Input, Select, InputNumber, Checkbox } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField = (AntComponent) => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) =>
    form.setFieldValue(field.name, value);
  const onChange = (value) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <FormItem
        label={label}
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? 'error' : 'success'}
      >
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {selectOptions &&
            selectOptions.map((name) => <Option key={name}>{name}</Option>)}
        </AntComponent>
      </FormItem>
    </div>
  );
};

export const LoremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nibh enim, non ultricies sem dignissim id. Mauris arcu libero, convallis ac felis sit amet, convallis laoreet lacus. Cras vestibulum, sapien non vestibulum consectetur, elit libero interdum neque, at vestibulum leo purus ac mi. Suspendisse orci eros, porta sit amet pellentesque et, pulvinar sit amet magna. Suspendisse feugiat orci auctor, pretium augue id, tincidunt urna. Pellentesque quis nulla semper, venenatis sapien sed, mollis odio. Etiam vulputate quis enim sed luctus. Etiam lobortis a sem ac blandit. Fusce condimentum urna nisl, ut iaculis tellus posuere id. Mauris vestibulum, metus vitae faucibus tristique, ligula tellus pharetra quam, eu scelerisque turpis nisi et purus. Sed pharetra urna dapibus, accumsan elit nec, cursus purus. Aliquam scelerisque massa ac posuere varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut commodo lorem vel nunc vestibulum, quis ultricies nunc commodo. Ut quis purus venenatis, consectetur ante sed, dictum neque. Fusce rhoncus felis vehicula, sollicitudin ligula a, pretium nisi.';

export const AntSelect = CreateAntField(Select);
export const AntInputNumber = CreateAntField(InputNumber);
export const AntCheckbox = CreateAntField(Checkbox);
export const AntInput = CreateAntField(Input);
