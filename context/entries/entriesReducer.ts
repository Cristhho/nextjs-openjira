import { EntriesState } from "./EntriesProvider";
import { Entry } from "../../interfaces";

type EntriesActionType =
|{ type: 'Entry - Add Entry', payload: Entry }
|{ type: 'Entry - Update', payload: Entry }
|{ type: 'Entry - Get All', payload: Entry[] }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case 'Entry - Add Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };
    case 'Entry - Update':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }

          return entry;
        })
      };
    case 'Entry - Get All':
      return {
        ...state,
        entries: [...action.payload]
      };
  
    default:
      return state;
  }
}