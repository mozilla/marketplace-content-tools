import {addonSubmitReducer, addonSubmitVersionReducer} from '../submit';
import * as submitActions from '../../actions/submit';
import * as submitVersionActions from '../../actions/submitVersion';


describe('submitReducer', () => {
  it('handles message change', () => {
    const newState = addonSubmitReducer(
      {
        message: '',
      },
      {
        type: submitActions.MESSAGE_CHANGE,
        payload: 'help me please'
      }
    );
    assert.equal(newState.message, 'help me please');
  });

  it('handles validation begin', () => {
    const newState = addonSubmitReducer(
      {
        message: 'help',
      },
      {
        type: submitActions.VALIDATION_BEGIN,
      }
    );
    assert.equal(newState.message, 'help');
    assert.ok(newState.isSubmitting);
  });
});


describe('submitVersionReducer', () => {
  it('handles message change', () => {
    const newState = addonSubmitVersionReducer(
      {
        message: '',
      },
      {
        type: submitVersionActions.MESSAGE_CHANGE,
        payload: 'help me please'
      }
    );
    assert.equal(newState.message, 'help me please');
  });

  it('handles validation begin', () => {
    const newState = addonSubmitVersionReducer(
      {
        message: 'help',
      },
      {
        type: submitVersionActions.VALIDATION_BEGIN,
      }
    );
    assert.equal(newState.message, 'help');
    assert.ok(newState.isSubmitting);
  });
});
