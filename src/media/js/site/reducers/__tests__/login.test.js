import loginReducer from '../login';
import * as loginActions from '../../actions/login';


describe('login', () => {
  it('stores popup on FxA login start', () => {
    const state = loginReducer({}, {
      type: loginActions.FXA_LOGIN_BEGIN,
      payload: 'fxaPopup'
    });
    assert.equal(state.popup, 'fxaPopup');
  });

  it('closes popup on Zamboni login finish', done => {
    const state = loginReducer({popup: {close: done}}, {
      type: loginActions.LOGIN_OK,
    });
    assert.notOk('popup' in state);
  });
});
