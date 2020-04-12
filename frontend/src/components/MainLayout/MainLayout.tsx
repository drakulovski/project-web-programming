import React, { ReactElement } from 'react';
import { Header } from '../Header/Header';
import { Row, Col } from 'antd';

interface Props {
  component: React.ReactNode;
}

export const MainLayout = (props: Props): ReactElement => {
  const { component } = props;
  return (
    <div>
      <Row gutter={[0, 40]} justify="center">
        <Col span={24}>
          <Header />
        </Col>
        <Col span={22}>{component}</Col>
      </Row>
    </div>
  );
};
