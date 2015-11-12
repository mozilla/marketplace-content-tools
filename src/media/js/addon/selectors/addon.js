import generatePageSelector from './utils/pagination';


export function addonPageSelector(substate, router) {
  return generatePageSelector(substate, router, 'addons');
}
