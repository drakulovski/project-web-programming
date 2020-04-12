import React, { Component } from 'react';
import { IJob } from '../Models/Models';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { postJobActions, postJob } from '../redux/jobReducer/jobThunks';
import { bindActionCreators } from 'redux';
import { AppState } from '../redux/store';
import { API } from '../api';
import JobForm from '../components/JobForm/JobForm';
import { defaultNotifcation } from '../components/Notification/Notification';
import history from '../Helpers/history';

type Props = ILinkDispatchProps & ILinkStateProps;
interface State {}

class PostJob extends Component<Props, State> {
  state = {};
  render() {
    return (
      <JobForm
        title="Post Job"
        handleSubmit={(mappedRequest: IJob) =>
          API.Job.postJob(mappedRequest)
            .then(() => {
              defaultNotifcation('Success', 'Edited job', 'success');
              history.push('/job_list');
            })
            .catch((error) =>
              defaultNotifcation('Error', error.message, 'error')
            )
        }
      />
    );
  }
}

interface ILinkStateProps {
  job: IJob;
  isLoading: boolean | null;
}

interface ILinkDispatchProps {
  postJob: typeof postJob;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, postJobActions>
): ILinkDispatchProps => ({
  postJob: bindActionCreators(postJob, dispatch),
});

const mapStateToProps = (state: AppState): ILinkStateProps => ({
  job: state.job.data as IJob,
  isLoading: state.job.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostJob);
