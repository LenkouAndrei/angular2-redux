import {Action} from '@ngrx/store';
import {INewsAPIArticle, INewsAPISource} from '../../services/http.service';

export interface IAddArticlesToListPayload {
  articles: INewsAPIArticle[];
  sourceId: string;
}

export enum FcNgrxRestApi {
  addArticlesToList = 'ADD_ARTICLES_TO_LIST',
  addSourcesToList = 'ADD_SOURCES_TO_LIST',
}

export class AddArticlesToList implements Action {
  public readonly type = FcNgrxRestApi.addArticlesToList;
  constructor(public payload: IAddArticlesToListPayload) {}
}

export class AddSourcesToList implements Action {
  public readonly type = FcNgrxRestApi.addSourcesToList;
  constructor(public payload: INewsAPISource[]) {}
}
