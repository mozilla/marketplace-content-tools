import WebsiteUrlForm from '../websiteUrlForm';


describe('WebsiteUrlForm', () => {
  jsdom();

  it('renders', () => {
    const form = ReactDOMHelper.render(<WebsiteUrlForm/>);
    assert.equal(ReactDOMHelper.queryTagAll(form, 'form').length, 1);
  });
});
