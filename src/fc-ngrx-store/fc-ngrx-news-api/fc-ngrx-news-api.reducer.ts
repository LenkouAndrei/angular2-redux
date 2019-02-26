import {Action} from '@ngrx/store';
import {FcNgrxRestApi, IAddArticlesToListPayload} from './fc-ngrx-news-api.actions';
import {INewsAPISource} from '../../services/http.service';

const initialArticlesState = {
  articles: [],
  sourceId: ''
};

const initialSourcesState = [];

export function newsApiArticlesReducer(state: IAddArticlesToListPayload = initialArticlesState, action: Action) {
  switch (action.type) {
    case FcNgrxRestApi.addArticlesToList:
      return { ...(action as any).payload };

    default:
      return state;
  }
}

export function newsApiSourcesReducer(state: INewsAPISource[] = initialSourcesState, action: Action) {
  switch (action.type) {
    case FcNgrxRestApi.addSourcesToList:
      return { ...(action as any).payload };

    default:
      return state;
  }
}
