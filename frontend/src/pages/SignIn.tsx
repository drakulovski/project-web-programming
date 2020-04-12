import React from 'react';
import { Link } from 'react-router-dom';
import { SignInForm } from '../components/LoginForm/SignInForm';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Wrapper = styled(Row)`
  margin-top: 10%;
`;

const Title = styled.h1`
  color: #1890ff;
`;

const Subtitle = styled.h4`
  color: #1890ff;
`;

interface Props {}

const SignIn = (props: Props) => {
  return (
    <Wrapper>
      <Col span={24}>
        <Container>
          <Title>Welcome to Job Advertise!</Title>
          <br />
          <Subtitle>
            Sign in to preview, post and connect with other businesses or
            workers!
          </Subtitle>
        </Container>
      </Col>
      <Col span={24}>
        <Container>
          <h3>Sign In</h3>
        </Container>
      </Col>
      <Col span={12} offset={6}>
        <SignInForm />
      </Col>
      <Col span={12} offset={6}>
        <Container>
          <h3>
            Login or <Link to="/register">Register</Link>
          </h3>
        </Container>
      </Col>
    </Wrapper>
  );
};

export default SignIn;
