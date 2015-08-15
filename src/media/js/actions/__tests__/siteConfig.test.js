import req from '../../request';
import * as siteConfig from '../siteConfig';


describe('siteConfig.fetch', () => {
  beforeEach(() => {
    sinon.stub(req, 'get', () => {
      return getReqMock({body: {fxa: 'abc'}});
    });
  });

  afterEach(() => {
    req.get.restore();
  });

  it('fetches siteConfig data', done => {
    function dispatch(action) {
      assert.equal(action.type, siteConfig.FETCH_OK);
      assert.deepEqual(action.payload, {fxa: 'abc'});
      done();
    }
    siteConfig.fetch()(dispatch);
  });
});
