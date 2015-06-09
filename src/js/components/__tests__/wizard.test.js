jest.dontMock('../wizard');

const React = require('react/addons');
const Test = React.addons.TestUtils;

const Wizard = require('../wizard').Wizard;


const steps = [
  {
    title: 'Step 1',
    onSubmit: (form) => {
      console.log('YEH 1');
    },
    form: <form>
      <button type="submit">Submit</button>
    </form>
  },
  {
    title: 'Step 2',
    onSubmit: (form) => {
      console.log('YEH 2');
    },
    form: <form>
      <button type="submit">Submit</button>
    </form>
  }
];


describe('Wizard', () => {
  it('renders steps', () => {
    const wizard = <Wizard steps={steps} activeStep={0}/>
    const testWizard = Test.renderIntoDocument(wizard);
    setTimeout(function() {
    console.log(document.querySelectorAll('form'));
    }, 1000);
    expect(Test.scryRenderedDOMComponentsWithTag(testWizard, 'form')
           .length).toBe(2);
  });

  it('goes to prev on pagination click', () => {
    const done = {
      done: () => {}
    };
    spyOn(done, 'done');

    const wizard = <Wizard steps={steps} activeStep={1}
                           goToPrevStep={done.done}/>
    const testWizard = Test.renderIntoDocument(wizard);
    React.addons.TestUtils.Simulate.click(testWizard.refs.prev);
    expect(done.done).toHaveBeenCalled();
  });

  it('goes to next on pagination click', () => {
    const done = {
      done: () => {}
    };
    spyOn(done, 'done');

    const wizard = <Wizard steps={steps} activeStep={0}
                           goToNextStep={done.done}/>
    const testWizard = Test.renderIntoDocument(wizard);
    React.addons.TestUtils.Simulate.click(testWizard.refs.next);
    expect(done.done).toHaveBeenCalled();
  });

  it('prev disabled at first step', () => {
    const wizard = <Wizard steps={steps} activeStep={0}/>
    const testWizard = Test.renderIntoDocument(wizard);
    expect(testWizard.refs.prev.props.disabled).toBe(true);
    expect(testWizard.refs.next.props.disabled).toBe(false);
  });

  it('next disabled at last step', () => {
    const wizard = <Wizard steps={steps} activeStep={1}/>
    const testWizard = Test.renderIntoDocument(wizard);
    expect(testWizard.refs.prev.props.disabled).toBe(false);
    expect(testWizard.refs.next.props.disabled).toBe(true);
  });
});
