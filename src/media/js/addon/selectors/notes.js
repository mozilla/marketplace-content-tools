import generatePageSelector from './utils/pagination';


export function notesPageSelector(substate, router) {
  return generatePageSelector(substate, router, 'notes');
}
