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
    expect(Test.scryRenderedDOMComponentsWithTag(testWizard, 'form').length,
           2);
  });
});
