import LocalStore from 'flummox-localstore';


const initialState = {
  categories: [],
  description: '',
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

    const submitActions = flux.getActionIds('submissionMetadataForm');
    this.register(submitActions.setFormData, this.handleSetFormData);
    this.register(submitActions.submitMetadata, this.clearData);
  }
  handleSetFormData(data) {
    this.setState(data);
  }
  clearData() {
    this.setState(initialState);
  }
}
