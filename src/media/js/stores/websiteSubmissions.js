/*
    Holds website submissions, keyed by ID.
*/
import _ from 'lodash';
import LocalStore from 'flummox-localstore';


export default class WebsiteSubmissionsStore extends LocalStore {
  constructor(flux) {
    super(flux, {
      key: 'WebsiteSubmissionsStore',
      initialState: {submissions: {}}
    });

    const submissionsActions = flux.getActionIds('websiteSubmissions');
    this.register(submissionsActions.fetch, this.handleFetch);
    this.register(submissionsActions.editSubmission,
                  this.handleEditSubmission);
  }
  handleFetch(submissions) {
    submissions.forEach(submission => {
      this.setState(state => {
        state.submissions[submission.id] = submission;
        return state;
      });
    });
  }
  get(id) {
    return this.state.submissions[id];
  }
  getAsList() {
    // Return submissions in list form.
    return Object.keys(this.state.submissions)
      .sort()
      .map(id => this.state.submissions[id]);
  }
  handleEditSubmission(data) {
    this.setState(state => {
      state.submissions[data.id] = _.extend(state.submissions[data.id],
                                            data.submissionData);
      return state;
    });
  }
}
export default WebsiteSubmissionsStore
