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
    ]
  };

  it('renders steps', () => {
    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    assert.equal(ReactDOMHelper.queryTagAll(testWizard, 'form').length, 2);
  });

  it('renders progress bar', () => {
    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    assert.ok(ReactDOMHelper.queryClass(testWizard, 'wizard--progress-bar'));
  });
});


describe('WizardProgressBar', () => {
  jsdom();

  const props = {
    activeStep: 0,
    steps: ['Step 1', 'Step 2']
  };
  props.goToStep = i => {
    return () => {
      props.activeStep = i;
    }
  }

  afterEach(() => {
    props.activeStep = 0;
  });

  it('renders steps', () => {
    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    assert.equal(
      ReactDOMHelper.queryClassAll(testWizard,
                                   'wizard--progress-bar-step').length, 2);
  });

  it('calls goToStep with proper index', () => {
    props.activeStep = 1;

    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    var steps = ReactDOMHelper.queryClassAll(testWizard,
                                            'wizard--progress-bar-step');
    ReactDOMHelper.click(steps[0]);
    assert.equal(props.activeStep, 0);

    ReactDOMHelper.click(steps[1]);
    assert.equal(props.activeStep, 1);
  });
});


describe('WizardStep', () => {
  jsdom();

  const props = {
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
