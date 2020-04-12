import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { IJob, IGetJobsParams } from '../models/Models';
import DisplayJobList from '../components/DisplayJobList/DisplayJobList';
import { Row, Pagination, Col, Spin } from 'antd';
import { getJobs, getJobsActions } from '../redux/jobReducer/jobThunks';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { AppState } from '../redux/store';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { API } from '../api';
import { defaultNotifcation } from '../components/Notification/Notification';

const StyledSelect = styled(ReactSelect)`
  width: 200px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

type Props = ILinkDispatchProps & ILinkStateProps;

type State = {};

class JobList extends Component<Props, State> {
  state = {
    sortedBy: {
      value: '',
      label: 'Sort By',
    },
  };

  componentDidMount() {
    this.getData();
  }

  getData = (params?: IGetJobsParams) => {
    const { getJobs } = this.props;
    const { sortedBy } = this.state;
    if (sortedBy.value !== '') {
      params = {
        ...params,
        sortBy: sortedBy.value,
      };
    }
    getJobs(params);
  };

  deleteJob = (id: number) => {
    API.Job.deleteJob(id)
      .then(() => {
        defaultNotifcation('Success', 'Deleted job', 'success');
        this.getData();
      })
      .catch((error) => {
        defaultNotifcation('Error', error.title, 'danger');
      });
  };

  render() {
    const { isLoading, jobs, pageNo, totalElements } = this.props;
    return (
      <React.Fragment>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Container>
              <h1>Job List</h1>
            </Container>
          </Col>
          <Col span={24}>
            <StyledSelect
              placeholder={'Sort By'}
              options={[
                { value: 'rate', label: 'Rate' },
                { value: 'available', label: 'Available' },
                { value: 'ratePerDay', label: 'Rate per Day' },
                {
                  value: 'availableOnWeekends',
                  label: 'Available on Weekends',
                },
              ]}
              value={this.state.sortedBy}
              onChange={(option: any) => {
                this.setState(
                  {
                    sortedBy: {
                      value: option.value,
                      label: option.label,
                    },
                  },
                  () => this.getData()
                );
              }}
            />
            {this.state.sortedBy.value && (
              <p>Sorting by {this.state.sortedBy.label} descending!</p>
            )}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {isLoading ? (
            <Spin />
          ) : (
            <DisplayJobList
              deleteJob={(id) => this.deleteJob(id)}
              isLoading={isLoading as boolean}
              jobList={jobs as IJob[]}
            />
          )}
        </Row>
        <Row>
          <Pagination
            current={pageNo + 1}
            onChange={(page) => this.getData({ pageNo: page - 1 })}
            defaultPageSize={2}
            total={totalElements}
          />
        </Row>
      </React.Fragment>
    );
  }
}

interface ILinkStateProps {
  jobs: Array<IJob> | IJob;
  pageNo: number;
  totalElements: number;
  lastPage: number;
  isLoading: boolean;
}

interface ILinkDispatchProps {
  getJobs: typeof getJobs;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, getJobsActions>
): ILinkDispatchProps => ({
  getJobs: bindActionCreators(getJobs, dispatch),
});

const mapStateToProps = (state: AppState): ILinkStateProps => ({
  jobs: state.job.data,
  pageNo: state.job.pageNo,
  totalElements: state.job.totalElements,
  lastPage: state.job.lastPage,
  isLoading: state.job.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
