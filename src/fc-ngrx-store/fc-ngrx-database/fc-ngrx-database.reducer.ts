import {Action} from '@ngrx/store';
import {IDatabaseArticle} from '../../services/http.database.service';
import {FcNgrxDatabase} from './fc-ngrx-database.actions';

export interface IDatabaseState {
  lastSaved: IDatabaseArticle | null;
  lastUpdated: IDatabaseArticle | null;
  lastDeleted: IDatabaseArticle | null;
  article: IDatabaseArticle | null;
  articles: IDatabaseArticle[] | [];
}

const initialArticlesState: IDatabaseState = {
  lastSaved: null,
  lastUpdated: null,
  lastDeleted: null,
  article: null,
  articles: [],
}

export function databaseReducer(state: IDatabaseState = initialArticlesState, action: Action) {
  switch (action.type) {
    case FcNgrxDatabase.saveArticle:
      return { ...state, lastSaved: (action as any).payload };

    case FcNgrxDatabase.updateArticle:
      return { ...state, lastUpdated: (action as any).payload };

    case FcNgrxDatabase.deleteArticle:
      return { ...state, lastDeleted: (action as any).payload };

    case FcNgrxDatabase.getArticle:
      return { ...state, article: (action as any).payload };

    case FcNgrxDatabase.geAllArticles:
      return { ...state, articles: (action as any).payload };

    default:
      return state;
  }
}
