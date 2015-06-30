import LocalStore from 'flummox-localstore';


export default class WebsiteSubmissionsStore extends LocalStore {
  constructor(flux) {
    super(flux, {
      key: 'WebsiteSubmissionsStore',
      initialState: {
        websites: {}
      }
    });
  }
  handleGetWebsiteSubmissions(submissions) {
  }
}


export default WebsiteSubmissionStore
