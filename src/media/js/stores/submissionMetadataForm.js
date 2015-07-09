/*
    Store for the Metadata form of Submission.
*/
import LocalStore from 'flummox-localstore';


const initialState = {
  categories: [],
  description: '',
  detected_icon: '',
  keywords: '',
  name: '',
  preferred_regions: [],
  public_credit: true,
  why_relevant: '',
  worldwide: true,
  works_well: ''
};


export default class SubmissionMetadataFormStore extends LocalStore {
  constructor(flux) {
    super(flux, {
        initialState: initialState,
        key: 'SubmissionMetadataFormStore'
    });

    const submitActions = flux.getActionIds('submission');
    this.register(submitActions.submitUrl, this.handleSubmitUrl);

    const submitMetadataActions = flux.getActionIds('submissionMetadataForm');
    this.register(submitMetadataActions.setFormData, this.handleSetFormData);
    this.register(submitMetadataActions.submitMetadata, this.clearData);
  }
  handleSubmitUrl(data) {
    this.setState({
      description: data.metadata.description,
      detected_icon: data.metadata.icon,
      name: data.metadata.name,
      url: data.metadata.canonical_url || this.state.url
    });
  }
  handleSetFormData(data) {
    this.setState(data);
  }
  clearData() {
    this.setState(initialState);
  }
}
