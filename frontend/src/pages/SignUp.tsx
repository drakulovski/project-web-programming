import React from 'react';
import { SignUpForm } from '../components/LoginForm/SignUpForm';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Wrapper = styled(Row)`
  margin-top: 15%;
`;

interface Props {}

const SignUp = (props: Props) => {
  return (
    <Wrapper>
      <Col span={24}>
        <Container>
          <h3>Sign Up</h3>
        </Container>
      </Col>
      <Col span={12} offset={6}>
        <SignUpForm />
      </Col>
    </Wrapper>
  );
};

export default SignUp;
