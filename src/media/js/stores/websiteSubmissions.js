/*
    Holds website submissions, keyed by ID.
*/
import LocalStore from 'flummox-localstore';


export default class WebsiteSubmissionsStore extends LocalStore {
  constructor(flux) {
    super(flux, {
      key: 'WebsiteSubmissionsStore',
      initialState: {submissions: {}}
    });

    const submissionsActions = flux.getActionIds('websiteSubmissions');
    this.register(submissionsActions.fetch, this.handleFetch);
  }
  handleFetch(submissions) {
    console.log(submissions);
    submissions.forEach(submission => {
      this.setState(state => {
        state.submissions[submission.id] = submission;
        return state;
      });
    });
  }
  getAsList() {
    // Return submissions in list form.
    return Object.keys(this.state.submissions)
      .sort()
      .map(id => this.state.submissions[id]);
  }
}
export default WebsiteSubmissionsStore
