import Wizard from '../wizard';


const steps = [
  {
    title: 'Step 1',
    onSubmit: (form) => {
    },
    form: <form>
      <button type="submit">Submit</button>
    </form>
  },
  {
    title: 'Step 2',
    onSubmit: (form) => {
    },
    form: <form>
      <button type="submit">Submit</button>
    </form>
  }
];


describe('Wizard', () => {
  jsdom();

  const props = {
    activeStep: 0,
    steps: steps,
    flux: fluxFactory()
  };

  it('renders steps', () => {
    const wizard = <Wizard {...props}/>
    const testWizard = TestUtils.renderIntoDocument(wizard);
    assert.equal(
        TestUtils.scryRenderedDOMComponentsWithTag(testWizard,'form').length,
        2);
  });

  it('prev disabled at first step', () => {
    const wizard = <Wizard {...props}/>
    const testWizard = TestUtils.renderIntoDocument(wizard);
    assert.ok(testWizard.refs.prev.props.disabled);
    assert.notOk(testWizard.refs.next.props.disabled);
  });

  it('next disabled at last step', () => {
    const wizard = <Wizard {...props} activeStep={1}/>
    const testWizard = TestUtils.renderIntoDocument(wizard);
    assert.notOk(testWizard.refs.prev.props.disabled);
    assert.ok(testWizard.refs.next.props.disabled);
  });

  it('goes to prev on pagination click', (done) => {
    const dun = () => {done()};
    const wizard = <Wizard {...props} activeStep={1} goToPrevStep={dun}/>
    const testWizard = TestUtils.renderIntoDocument(wizard);
    TestUtils.Simulate.click(testWizard.refs.prev);
  });

  it('goes to next on pagination click', (done) => {
    const dun = () => {done()};
    const wizard = <Wizard {...props} goToNextStep={dun}/>
    const testWizard = TestUtils.renderIntoDocument(wizard);
    TestUtils.Simulate.click(testWizard.refs.next);
  });
});
