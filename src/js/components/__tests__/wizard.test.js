import {Flummox} from 'flummox';
import Wizard from '../wizard';


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
  jsdom();

  const props = {
    activeStep: 0,
    steps: steps,
    flux: new Flummox()
  };

  it('renders steps', () => {
    const wizard = <Wizard {...props}/>
    const testWizard = TestUtils.renderIntoDocument(wizard);
    assert.equal(
        TestUtils.scryRenderedDOMComponentsWithTag(testWizard,'form').length,
        2);
  });

  it('goes to prev on pagination click', (done) => {
    const wizard = <Wizard {...props} activeStep={1} goToPrevStep={done}/>
    const testWizard = TestUtils.renderIntoDocument(wizard);
    TestUtils.Simulate.click(testWizard.refs.prev);
  });

  it('goes to next on pagination click', (done) => {
    const wizard = <Wizard {...props} goToNextStep={done}/>
    const testWizard = TestUtils.renderIntoDocument(wizard);
    TestUtils.Simulate.click(testWizard.refs.next);
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
});
