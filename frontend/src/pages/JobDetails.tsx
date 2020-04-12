import React, { Component } from 'react';
import { IJob } from '../Models/Models';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Avatar,
  Tag,
  Statistic,
  Divider,
  Typography,
  Button,
  Spin,
} from 'antd';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { getJob, getJobActions } from '../redux/jobReducer/jobThunks';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators, compose } from 'redux';
import { AppState } from '../redux/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { JobsFetching } from '../redux/actions';
import styled from 'styled-components';

const { Paragraph } = Typography;

const ActionButton = styled(Button)`
  margin-left: 5px;
  margin-bottom: 10px;
`;

type TParams = { id: string };

type Props = ILinkDispatchProps &
  ILinkStateProps &
  RouteComponentProps<TParams>;

type State = {};

class JobDetails extends Component<Props, State> {
  state = {};

  componentDidMount() {
    const { getJob } = this.props;
    const { id } = this.props.match.params;
    getJob(Number(id));
  }

  componentWillUnmount() {
    const { setLoading } = this.props;
    setLoading(true);
  }

  render() {
    const { isLoading, jobList } = this.props;
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const job = jobList[0];
    if (isLoading) return <Spin />;
    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col span={12}>
            <Row gutter={[0, 6]}>
              <Col span={2}>
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  size="large"
                  icon={<UserOutlined />}
                />
              </Col>
              <Col span={22}>
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
            {Number(loggedInUser.id) === Number(job.user.id) ||
            loggedInUser.isAdmin ? (
              <>
                <ActionButton type="primary">
                  <Link to={`/edit_job/${job.id}`}>Edit Job</Link>
                </ActionButton>
              </>
            ) : null}
            <Paragraph>
              Location : <Tag color="green">{job.location}</Tag>
            </Paragraph>
          </Col>
          <Divider />
          <Paragraph>Description: {job.description}</Paragraph>
          <Divider />
          <Paragraph>Qualifications: {job.qualifications}</Paragraph>
        </Row>
      </React.Fragment>
    );
  }
}

interface ILinkStateProps {
  jobList: IJob[];
  isLoading: boolean | null;
}

interface ILinkDispatchProps {
  getJob: typeof getJob;
  setLoading: typeof JobsFetching;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, getJobActions>
): ILinkDispatchProps => ({
  getJob: bindActionCreators(getJob, dispatch),
  setLoading: bindActionCreators(JobsFetching, dispatch),
});

const mapStateToProps = (state: AppState): ILinkStateProps => ({
  jobList: state.job.data as IJob[],
  isLoading: state.job.isLoading,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JobDetails);
