/*
  Communication threads, keyed by add-on version ID.
*/
import _ from 'lodash';
import Url from 'urlgray';

import * as commActions from '../actions/comm';


const initialState = {
  __persist: true,
  threads: {}
};


export default function threadReducer(state=initialState, action) {
  switch (action.type) {
    case commActions.FETCH_THREAD_OK: {
      /*
        Attach communication notes to version.

        payload (object) --
          notes (array): list of notes.
          threadId (number): thread ID.
          versionId (number): version ID.
      */
      const {notes, threadId, versionId} = action.payload;
      const newState = _.cloneDeep(state);
      newState.threads[versionId] = {
        threadId: threadId,
        notes: notes
      };
      return newState;
    }

    case commActions.SUBMIT_NOTE_OK: {
      /*
        Note submitted.

        payload (object) --
          note (object): deserialized note object.
          versionId (number): version ID of the thread the note belongs to.
      */
      const {note, versionId} = action.payload;
      const newState = _.cloneDeep(state);
      newState.threads[versionId].notes.push(note);
      return newState;
    }

    default: {
      return state;
    }
  }
}
