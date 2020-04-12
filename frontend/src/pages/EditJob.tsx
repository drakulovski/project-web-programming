import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IJob } from '../Models/Models';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { postJobActions, getJob } from '../redux/jobReducer/jobThunks';
import { bindActionCreators, compose } from 'redux';
import { AppState } from '../redux/store';
import { API } from '../api';
import JobForm from '../components/JobForm/JobForm';
import { defaultNotifcation } from '../components/Notification/Notification';
import history from '../Helpers/history';
import { JobsFetching } from '../redux/actions';
import { Spin } from 'antd';

type TParams = { id: string };

type Props = ILinkDispatchProps &
  ILinkStateProps &
  RouteComponentProps<TParams>;
interface State {}
interface IFormData {
  title: string;
  description: string;
  qualifications: string;
  ratePerDay: boolean;
  rate: number;
  location: string;
  isCompany: boolean;
  available: boolean;
  categoryId: number;
  industryId: number;
}

class EditJob extends Component<Props, State> {
  state = {};

  componentDidMount() {
    const { id } = this.props.match.params;
    const { getJob } = this.props;
    getJob(Number(id));
  }

  componentWillUnmount() {
    const { setLoading } = this.props;
    setLoading(true);
  }

  render() {
    const { id } = this.props.match.params;
    const { job, isLoading } = this.props;
    if (isLoading) {
      return <Spin />;
    }
    return (
      <JobForm
        title="Edit Job"
        handleSubmit={(mappedRequest: IJob) =>
          API.Job.putJob(Number(id), mappedRequest)
            .then(() => {
              defaultNotifcation('Success', 'Edited job', 'success');
              history.push('/job_list');
            })
            .catch((error) =>
              defaultNotifcation('Error', error.message, 'danger')
            )
        }
        job={job}
      />
    );
  }
}

interface ILinkStateProps {
  job: IJob;
  isLoading: boolean | null;
}

interface ILinkDispatchProps {
  getJob: typeof getJob;
  setLoading: typeof JobsFetching;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, postJobActions>
): ILinkDispatchProps => ({
  getJob: bindActionCreators(getJob, dispatch),
  setLoading: bindActionCreators(JobsFetching, dispatch),
});

const mapStateToProps = (state: AppState): ILinkStateProps => ({
  job: state.job.data[0] as IJob,
  isLoading: state.job.isLoading,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EditJob);
