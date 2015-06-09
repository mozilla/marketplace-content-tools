import {Wizard, WizardStep} from '../wizard';


describe('Wizard', () => {
  jsdom();

  const props = {
    activeStep: 0,
    steps: [
      {
        title: 'Step 1',
        onSubmit: () => {},
        form: <form></form>
      },
      {
        title: 'Step 2',
        onSubmit: () => {},
        form: <form></form>
      }
    ],
    flux: helpers.fluxFactory()
  };

  it('renders steps', () => {
    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    assert.equal(ReactDOMHelper.queryTagAll(testWizard, 'form').length, 2);
  });

  it('prev disabled at first step', () => {
    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    assert.ok(testWizard.refs.prev.props.disabled);
    assert.notOk(testWizard.refs.next.props.disabled);
  });

  it('next disabled at last step', () => {
    const wizard = <Wizard {...props} activeStep={1}/>
    const testWizard = ReactDOMHelper.render(wizard);
    assert.notOk(testWizard.refs.prev.props.disabled);
    assert.ok(testWizard.refs.next.props.disabled);
  });

  it('goes to prev on pagination click', (done) => {
    const dun = () => {done()};
    const wizard = <Wizard {...props} activeStep={1} goToPrevStep={dun}/>
    const testWizard = ReactDOMHelper.render(wizard);
    ReactDOMHelper.click(testWizard.refs.prev);
  });

  it('goes to next on pagination click', (done) => {
    const dun = () => {done()};
    const wizard = <Wizard {...props} goToNextStep={dun}/>
    const testWizard = ReactDOMHelper.render(wizard);
    ReactDOMHelper.click(testWizard.refs.next);
  });
});


describe('WizardStep', () => {
  jsdom();

  const props = {
    flux: helpers.fluxFactory(),
    isActive: true,
    title: 'Test Step'
  };

  it('fires onSubmit on form submit', (done) => {
    const dun = () => {
      done();
    };

    props.form = <form onSubmit={dun}/>;

    const wizardStep = <WizardStep {...props} onSubmit={dun}/>
    const testWizardStep = ReactDOMHelper.render(wizardStep);
    const form = ReactDOMHelper.queryTag(testWizardStep, 'form');
    ReactDOMHelper.submit(form);
  });

  it('visible if active', () => {
    const wizardStep = <WizardStep isActive={true}/>
    const testWizardStep = ReactDOMHelper.render(wizardStep);
    const section = ReactDOMHelper.queryClass(testWizardStep, 'wizard--step');
    assert.notEqual(section.props.style.display, 'none');
  });

  it('hidden if not active', () => {
    const wizardStep = <WizardStep isActive={false}/>
    const testWizardStep = ReactDOMHelper.render(wizardStep);
    const section = ReactDOMHelper.queryClass(testWizardStep, 'wizard--step');
    assert.equal(section.props.style.display, 'none');
  });
});
