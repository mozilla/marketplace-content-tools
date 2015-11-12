import generatePaginatedReducer from './utils/pagination';
import * as reviewLogActions from '../actions/reviewLog';


export default generatePaginatedReducer(reviewLogActions, 'notes');
