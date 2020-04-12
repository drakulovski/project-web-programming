import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';
import { Input } from 'formik-antd';
import { API } from '../../api';
import ReactSelect from 'react-select';
import * as Yup from 'yup';
import { IUserSignUpParams } from '../../api/Auth';
import { defaultNotifcation } from '../Notification/Notification';
import history from '../../helpers/history';
import styled from 'styled-components';

const ErrorMessage = styled(FormikErrorMessage)`
  color: red;
`;

interface IProps {}
interface IState {}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().min(5, 'Too Short!').required('Required'),
  username: Yup.string().min(5, 'Too Short!').max(10, 'Too Long!'),
  selectedRole: Yup.string().min(3, 'Select Role'),
});

export class SignUpForm extends Component<IProps, IState> {
  state = {
    selectedRole: {
      value: '',
      label: 'Select Role',
    },
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
          selectedRole: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          let roles = [];
          if (values.selectedRole === 'both') {
            roles.push('user');
            roles.push('admin');
          } else {
            roles.push(values.selectedRole);
          }
          const mappedRequest: IUserSignUpParams = {
            username: values.username,
            email: values.email,
            password: values.password,
            role: roles,
          };
          API.Auth.signUp(mappedRequest)
            .then((response) => {
              defaultNotifcation('Success', 'Registered user!', 'success');
              history.push('/login');
            })
            .catch((error) => {
              defaultNotifcation('Error', error.title, 'danger');
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Row gutter={[5, 18]}>
              <Col span={24}>
                <Input type="username" name="username" placeholder="Username" />
                <ErrorMessage name="username" component="div" />
              </Col>
              <Col span={24}>
                <Input type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
              </Col>
              <Col span={24}>
                <Input type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" />
              </Col>
              <Col span={24}>
                <Field
                  name="selectedRole"
                  component={({ field, form }: any) => (
                    <ReactSelect
                      placeholder={'Select Category'}
                      isMulti={false}
                      options={[
                        { value: 'admin', label: 'Admin' },
                        { value: 'user', label: 'User' },
                        { value: 'both', label: 'Both' },
                      ]}
                      value={this.state.selectedRole}
                      onChange={(option: any) => {
                        this.setState(
                          {
                            selectedRole: {
                              value: option.value,
                              label: option.label,
                            },
                          },
                          () => {
                            form.setFieldValue(field.name, option.value);
                          }
                        );
                      }}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                <ErrorMessage name="selectedRole" component="div" />
              </Col>
              <Col span={9} offset={11}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}
