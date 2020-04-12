import React, { Component } from 'react';
import { Menu, Modal, Row, Col, Tag } from 'antd';
import {
  AuditOutlined,
  FormOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import history from '../../helpers/history';
import { API } from '../../api';
import { defaultNotifcation } from '../Notification/Notification';
import FastField from '../FastField/FastField';
import styled from 'styled-components';

const Badge = styled(Tag)`
  margin-left: 5px;
`;

export class Header extends Component {
  state = {
    current: '',
    industryModal: false,
    categoryModal: false,
    industry: '',
    category: '',
  };

  componentDidMount() {
    this.setState({ current: `${history.location.pathname}` });
  }

  handleClick = (e: any) => {
    const { key } = e;
    // Prevent changing route or current state if selected is Post Category, Post Industry , User or Logo
    if (
      key === '/post_category' ||
      key === '/post_industry' ||
      key === 'logo' ||
      key === 'user'
    ) {
      return;
    }
    this.setState(
      {
        current: key,
      },
      () => {
        history.push(`${key}`);
      }
    );
  };

  handleModal = (value, modalType: string) => {
    this.setState({ [`${modalType}Modal`]: value });
  };

  render() {
    return (
      <React.Fragment>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="logo">
            <RiseOutlined />
            Job Advertising
          </Menu.Item>
          <Menu.Item key="/job_list">
            <AuditOutlined />
            Job List
          </Menu.Item>
          <Menu.Item key="/post_job">
            <FormOutlined />
            Post Job
          </Menu.Item>
          <Menu.Item
            key="/post_industry"
            id="industry"
            onClick={() => this.handleModal(true, 'industry')}
          >
            <PlusCircleOutlined />
            Create Industry
          </Menu.Item>
          <Menu.Item
            key="/post_category"
            id="category"
            onClick={() => this.handleModal(true, 'category')}
          >
            <PlusCircleOutlined />
            Create Category
          </Menu.Item>
          {/* Antd doesn't allow more elegant solution to align right to menu items , issue for this problem is not closed on github */}
          <Menu.Item
            style={{
              float: 'right',
            }}
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('user');
              history.push('/');
            }}
          >
            <LogoutOutlined />
            Logout
          </Menu.Item>
          {localStorage.getItem('user') && (
            <Menu.Item
              style={{
                float: 'right',
              }}
              key="user"
            >
              Logged in user:{' '}
              {JSON.parse(localStorage.getItem('user')).username}
              {JSON.parse(localStorage.getItem('user')).isAdmin ? (
                <Badge color="red">ADMIN</Badge>
              ) : null}
            </Menu.Item>
          )}
        </Menu>
        <Modal
          title="Post Industry"
          visible={this.state.industryModal}
          onOk={() => {
            const { industry } = this.state;
            API.Industry.postIndustry({ name: industry })
              .then(() => {
                defaultNotifcation(
                  'Success',
                  `Created industry with name : ${industry}`,
                  'success'
                );
                this.setState({ industry: '' });
              })
              .then(() => this.handleModal(false, 'industry'))
              .catch((error) => {
                defaultNotifcation('Error', error.title, 'danger');
              });
          }}
          onCancel={() => this.handleModal(false, 'industry')}
          destroyOnClose
        >
          <Row gutter={[5, 18]}>
            <Col span={24}>
              <FastField
                placeholder="Industry Name"
                onBlur={(value) => this.setState({ industry: value })}
              />
            </Col>
          </Row>
        </Modal>
        <Modal
          title="Post Category"
          visible={this.state.categoryModal}
          onOk={() => {
            const { category } = this.state;
            API.Category.postCategory({ name: category })
              .then(() => {
                defaultNotifcation(
                  'Success',
                  `Created category with name : ${category}`,
                  'success'
                );
                this.setState({ category: '' });
              })
              .then(() => this.handleModal(false, 'category'))
              .catch((error) => {
                defaultNotifcation('Error', error.title, 'danger');
              });
          }}
          onCancel={() => this.handleModal(false, 'category')}
          destroyOnClose
        >
          <Row gutter={[5, 18]}>
            <Col span={24}>
              <FastField
                placeholder="Category Name"
                onBlur={(value) => this.setState({ category: value })}
              />
            </Col>
          </Row>
        </Modal>
      </React.Fragment>
    );
  }
}
