import WebsiteSubmit from '../submit';


describe('WebsiteSubmit', () => {
  jsdom();

  function setup(_props) {
    let props = Object.assign({
      submitter: 'kngo@mozilla.com',
      submissionWebsite: {},
      submissionWebsiteUrl: {},
    }, _props);
    return ReactDOMHelper.render(<WebsiteSubmit {...props}/>);
  }

  it('renders forms', () => {
    const testSubmissonWebsite = setup();
    assert.equal(
      ReactDOMHelper.queryTagAll(testSubmissonWebsite, 'form').length,
      2);
  });

  it('fires submit URL action', done => {
    const testWebsiteSubmit = setup({
      submitUrl(url) {
        assert.equal(url, 'http://google.com');
        done();
      }
    });

    // Input URL.
    const input = ReactDOMHelper.queryClass(testSubmissonWebsite,
                                            'submission--url');
    ReactDOMHelper.change(input, {target: {value: 'http://google.com'}});

    // Submit form.
    const form = ReactDOMHelper.queryClass(testSubmissonWebsite,
                                           'submission--url-form');
    setTimeout(() => {
      // Wait for input to change.
      ReactDOMHelper.submit(form);
    });
  });
});
