import {Action} from '@ngrx/store';
import {IDatabaseArticle} from '../../services/http.database.service';

export enum FcNgrxDatabase {
  saveArticle = 'SAVE_ARTICLE',
  getArticle = 'GET_ARTICLE',
  deleteArticle = 'DELETE_ARTICLE',
  updateArticle = 'UPDATE_ARTICLE',
  geAllArticles = 'GET_ALL_ARTICLES',
}

export class SaveArticleToDB implements Action {
  public readonly type = FcNgrxDatabase.saveArticle;
  constructor(public payload: IDatabaseArticle) {}
}

export class GetArticleFromDB implements Action {
  public readonly type = FcNgrxDatabase.getArticle;
  constructor(public payload: IDatabaseArticle | null) {}
}

export class DeleteArticleFromDB implements Action {
  public readonly type = FcNgrxDatabase.deleteArticle;
  constructor(public payload: IDatabaseArticle) {}
}

export class UpdateArticleInDB implements Action {
  public readonly type = FcNgrxDatabase.updateArticle;
  constructor(public payload: IDatabaseArticle) {}
}

export class GetAllArticlesFromDB implements Action {
  public readonly type = FcNgrxDatabase.geAllArticles;
  constructor(public payload: IDatabaseArticle[]) {}
}
