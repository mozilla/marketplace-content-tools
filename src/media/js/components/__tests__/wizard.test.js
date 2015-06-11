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
    highestStep: 0,
    steps: ['Step 1', 'Step 2']
  };
  props.goToStep = i => {
    return () => {
      props.activeStep = i;
    }
  }

  afterEach(() => {
    props.activeStep = 0;
    props.highestStep = 0;
  });

  it('renders steps', () => {
    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    assert.equal(
      ReactDOMHelper.queryClassAll(testWizard,
                                   'wizard-progress-bar-item').length, 2);
  });

  it('calls goToStep on previous step', () => {
    props.activeStep = 1;
    props.highestStep = 1;

    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    var steps = ReactDOMHelper.queryClassAll(testWizard,
                                            'wizard-progress-bar-item');
    ReactDOMHelper.click(steps[0]);
    assert.equal(props.activeStep, 0);
  });

  it('has correct state when on step 1 but have not been to step 2', () => {
    props.activeStep = 0;
    props.highestStep = 0;

    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    var steps = ReactDOMHelper.queryClassAll(testWizard,
                                            'wizard-progress-bar-item');

    assert.notEqual(React.findDOMNode(steps[0]).tagName, 'A');
    assert.notEqual(React.findDOMNode(steps[1]).tagName, 'A');
  });

  it('has correct state when on step 2', () => {
    props.activeStep = 1;
    props.highestStep = 1;

    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    var steps = ReactDOMHelper.queryClassAll(testWizard,
                                            'wizard-progress-bar-item');

    assert.equal(React.findDOMNode(steps[0]).tagName, 'A');
    assert.notEqual(React.findDOMNode(steps[1]).tagName, 'A');
  });

  it('has correct state when on step 1 but have been to step 2', () => {
    props.activeStep = 0;
    props.highestStep = 1;

    const wizard = <Wizard {...props}/>
    const testWizard = ReactDOMHelper.render(wizard);
    var steps = ReactDOMHelper.queryClassAll(testWizard,
                                            'wizard-progress-bar-item');

    assert.notEqual(React.findDOMNode(steps[0]).tagName, 'A');
    assert.equal(React.findDOMNode(steps[1]).tagName, 'A');
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
    const section = ReactDOMHelper.queryClass(testWizardStep, 'wizard-step');
    assert.notEqual(section.props.style.display, 'none');
  });

  it('hidden if not active', () => {
    const wizardStep = <WizardStep isActive={false}/>
    const testWizardStep = ReactDOMHelper.render(wizardStep);
    const section = ReactDOMHelper.queryClass(testWizardStep, 'wizard-step');
    assert.equal(section.props.style.display, 'none');
  });
});
