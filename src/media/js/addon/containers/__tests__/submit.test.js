import {AddonSubmit} from '../submit';


describe('AddonSubmit', () => {
  jsdom();

  const props = {
    submit: () => {},
    user: {},
  };

  it('renders', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonSubmit}
                          {...props}/>
    );
    assert.equal(ReactDOMHelper.queryTagAll(component, 'form').length, 1);
    assert.ok(ReactDOMHelper.queryTag(component, 'button').props.disabled);
    assert.notOk(ReactDOMHelper.queryClassAll(component,
                                              'form-msg--error').length);
  });

  it('disables button when isSubmitting', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonSubmit}
                          {...props}
                          isSubmitting={true}/>
    );
    assert.ok(ReactDOMHelper.queryTag(component, 'button').props.disabled);
  });

  it('displays validation error message', () => {
    const component = ReactDOMHelper.render(
      <StubRouterProvider Component={AddonSubmit}
                          {...props}
                          validationError="No file found."/>
    );
    assert.ok(ReactDOMHelper.queryClassAll(component,
                                           'form-msg--error').length);
  });
});
