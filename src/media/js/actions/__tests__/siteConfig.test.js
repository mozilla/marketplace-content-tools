import req from '../../request';
import SiteConfigActions from '../siteConfig';


describe('SiteConfigActions.getSiteConfig', () => {
  sinon.stub(req, 'get', () => {
    return new Promise(resolve => {
      resolve({body: {fxa: 'kevintoken'}});
    });
  });

  it('resolves siteConfig data', done => {
    SiteConfigActions.getSiteConfig().then(data => {
      assert.equal(data.fxa, 'kevintoken');
      done();
    });
  });
});
