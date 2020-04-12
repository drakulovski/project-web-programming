/*eslint no-unused-expressions: "error"*/
import React from 'react';
import { IJob } from '../../models/Models';
import {
  Card,
  Col,
  Button,
  Row,
  Statistic,
  Avatar,
  Typography,
  Tag,
  Divider,
  Alert,
} from 'antd';
import { UserOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const StyledLink = styled(Link)`
  margin-top: 15px;
  text-decoration: none;
  width: 100%;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const ActionButton = styled(Button)`
  margin-left: 5px;
`;

interface Props {
  jobList: IJob[];
  isLoading: boolean;
  deleteJob: (id: number) => void;
}

const DisplayJobList = ({ jobList, isLoading, deleteJob }: Props) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  if (jobList.length < 1) {
    return (
      <Col span={24}>
        <Container>
          <Alert
            message="Please create Category and Industry before posting the first job!"
            type="info"
          />
          <StyledLink to={'/post_job'}>
            <Button size="large" type="primary" style={{ height: '100px' }}>
              {' '}
              There are no posted jobs. Click on the button to post the first
              one !
              <br />
              <FormOutlined style={{ fontSize: '25px' }} /> Post Job
            </Button>
          </StyledLink>{' '}
        </Container>
      </Col>
    );
  }
  if (Array.isArray(jobList)) {
    return (
      <React.Fragment>
        {jobList.map((job: IJob, index) => (
          <Col span={12} key={index}>
            <Card
              title={job.title}
              extra={
                <React.Fragment>
                  <ActionButton>
                    <Link to={`/job/${job.id}`}>Details</Link>
                  </ActionButton>
                  {Number(loggedInUser.id) === Number(job.user.id) ||
                  loggedInUser.isAdmin ? (
                    <>
                      <ActionButton type="primary">
                        <Link to={`/edit_job/${job.id}`}>Edit Job</Link>
                      </ActionButton>
                      <ActionButton
                        type="danger"
                        onClick={() => deleteJob(job.id)}
                      >
                        Delete Job
                      </ActionButton>
                    </>
                  ) : null}
                </React.Fragment>
              }
              key={job.id}
            >
              <Row>
                <Col span={12}>
                  <Row gutter={[0, 6]}>
                    <Col span={4}>
                      <Avatar
                        style={{ backgroundColor: '#87d068' }}
                        size="large"
                        icon={<UserOutlined />}
                      />
                    </Col>
                    <Col span={20}>
                      <Paragraph>
                        Posted by : {job.user.username}{' '}
                        {job.company ? (
                          <Tag color="blue">
                            Verified Company <CheckOutlined />
                          </Tag>
                        ) : null}
                      </Paragraph>
                      <Paragraph>Contact : {job.user.email}</Paragraph>
                    </Col>
                  </Row>
                  <Paragraph>
                    Industry : <Tag color="purple">{job.industry.name}</Tag>
                  </Paragraph>
                  <Paragraph>
                    Category : <Tag color="orange">{job.category.name}</Tag>
                  </Paragraph>
                </Col>
                <Col span={8}>
                  <Statistic title="Rate" value={`${job.rate} $`} />
                  {job.ratePerDay && (
                    <Paragraph>NOTE: This rate is per day</Paragraph>
                  )}
                  <Paragraph>
                    {job.availableOnWeekends ? (
                      <Tag color="success">Can be booked on weekends!</Tag>
                    ) : (
                      <Tag color="red">We don't work on weekends.</Tag>
                    )}
                  </Paragraph>
                  <Paragraph>
                    Available:{' '}
                    {job.available ? (
                      <Tag color="success">Yes</Tag>
                    ) : (
                      <Tag color="red">No</Tag>
                    )}
                  </Paragraph>
                </Col>
                <Col span={4}>
                  <Paragraph>
                    Location : <Tag color="green">{job.location}</Tag>
                  </Paragraph>
                </Col>
                <Divider />
                <Paragraph>Description: {job.description}</Paragraph>
              </Row>
            </Card>
          </Col>
        ))}
      </React.Fragment>
    );
  }
};

export default DisplayJobList;
