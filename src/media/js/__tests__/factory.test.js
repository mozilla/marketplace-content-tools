/*
  Generate test objects.
*/
export function addonFactory(kwargs) {
  return Object.assign({}, {
    mini_manifest_url: 'http://testmanifest.com',
    name: 'Test Firefox OS Addon',
    slug: 'test-addon',
  }, kwargs);
}


export function versionFactory(kwargs) {
  return Object.assign({}, {
    id: 1,
    download_url: 'http://testmanifest.com',
    status: 'pending',
    unsigned_download_url: 'http://testmanifest.com',
    version: '1.0',
  }, kwargs);
}


export function versionsFactory() {
  return [
    versionFactory(),
    versionFactory({id: 2, version: '2.0'}),
  ];
}
