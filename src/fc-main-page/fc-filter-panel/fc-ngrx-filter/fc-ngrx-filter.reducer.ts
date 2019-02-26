import {Action} from '@ngrx/store';
import {FcNgrxFilters} from './fc-ngrx-filter.actions';

export interface IFilterOptions {
  word: string;
  onlyMy: boolean;
}
const initialArticlesState = {
  word: '',
  onlyMy: false
};

export function filterReducer(state: IFilterOptions = initialArticlesState, action: Action) {
  switch (action.type) {
    case FcNgrxFilters.WORD_FILTER:
      return {...state, word: (action as any).payload};

    case FcNgrxFilters.ONLY_MY:
      const onlyMy = !state.onlyMy;
      return {...state, onlyMy};

    default:
      return state;
  }
}
