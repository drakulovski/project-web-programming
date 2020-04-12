import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { Formik, Form, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from 'formik-antd';
import { API } from '../../api';
import { IUserLoginParams } from '../../api/Auth';
import { defaultNotifcation } from '../Notification/Notification';
import history from '../../Helpers/history';
import styled from 'styled-components';

const ErrorMessage = styled(FormikErrorMessage)`
  color: red;
`;

interface IProps {}
interface IState {}

interface IFormData {
  username?: string;
  password?: string;
}

const SignupSchema = Yup.object().shape({
  password: Yup.string().min(5, 'Too Short!').required('Required'),
  username: Yup.string().min(5, 'Too Short!').max(10, 'Too Long!'),
});

export class SignInForm extends Component<IProps, IState> {
  state = {};

  render() {
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          const params: IUserLoginParams = {
            password: values.password,
            username: values.username,
          };
          API.Auth.signIn(params)
            .then(() => history.push('/job_list'))
            .catch((error) => {
              defaultNotifcation('Error', error.title, 'danger');
            })
            .finally(() => setSubmitting(false));
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
                <Input type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" />
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
