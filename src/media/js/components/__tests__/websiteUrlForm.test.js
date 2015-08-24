import WebsiteUrlForm from '../websiteUrlForm';


describe('WebsiteUrlForm', () => {
  jsdom();

  it('renders form', () => {
    const form = ReactDOMHelper.render(<WebsiteUrlForm/>);
    assert.equal(ReactDOMHelper.queryTagAll(form, 'form').length, 1);
  });

  it('submits okay', done => {
    function submitUrl(url) {
      assert.equal(url, 'http://ngokevin.com');
      done();
    }

    const form = ReactDOMHelper.render(
      <SubmissionUrlForm submitHandler={submitUrl}/>);
    const input = ReactDOMHelper.queryTag(form, 'input');
    ReactDOMHelper.change(input, {target: {value: 'http://ngokevin.com'}});
    ReactDOMHelper.submit(ReactDOMHelper.queryTag(form, 'form'));
  });
});
