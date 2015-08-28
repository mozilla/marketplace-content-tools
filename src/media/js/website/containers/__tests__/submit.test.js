import {WebsiteSubmit} from '../submit';
import {initialState as submitUrlInitialState} from '../../reducers/submitUrl';


describe('WebsiteSubmit', () => {
  jsdom();

  function setup(_props) {
    let props = Object.assign({
      submitter: 'kngo@mozilla.com',
      websiteSubmit: {},
      websiteSubmitUrl: submitUrlInitialState,
    }, _props);
    return ReactDOMHelper.render(<WebsiteSubmit {...props}/>);
  }

  it('renders', () => {
    const testWebsiteSubmit = setup();
    assert.equal(
      ReactDOMHelper.queryTagAll(testWebsiteSubmit, 'form').length,
      2);
  });
});
