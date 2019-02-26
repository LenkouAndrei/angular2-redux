import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IAppStore} from '../app/app.store';
import {
  DeleteArticleFromDB,
  GetAllArticlesFromDB,
  GetArticleFromDB,
  SaveArticleToDB,
  UpdateArticleInDB
} from '../fc-ngrx-store/fc-ngrx-database/fc-ngrx-database.actions';

export interface IDatabaseArticle {
    author: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
    isCreatedByMe: boolean;
    id: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpDatabaseService {
  constructor(
    private http: HttpClient,
    private store: Store<IAppStore>
  ) {}

  public saveArticle(article): void {
    this.http.post('http://localhost:8080/', article)
      .subscribe(savedArticle => this.store.dispatch(new SaveArticleToDB(savedArticle[0])));
  }

  public getArticle(id: string): void {
    const options = { params: new HttpParams().set('id', id) };
    this.http.get('http://localhost:8080/', options)
      .pipe(flatMap(responseAsArray => of((responseAsArray[0]))))
      .subscribe(article => this.store.dispatch(new GetArticleFromDB(article)));
  }

  public deleteArticle(id: string): void {
    const options = { params: new HttpParams().set('id', id) };
    console.log(id);
    this.http.post('http://localhost:8080/:id', {_method: 'delete'}, options)
      .subscribe(article => this.store.dispatch(new DeleteArticleFromDB(article[0])));
  }

  public updateArticle(id: string): void {
    const options = { params: new HttpParams().set('id', id) };
    this.http.post('http://localhost:8080/:id', {_method: 'put'}, options)
      .subscribe(updatedArticle => this.store.dispatch(new UpdateArticleInDB(updatedArticle[0])));
  }

  public getAllArticles(): void {
    this.http.get('http://localhost:8080/')
      .subscribe(articles => this.store.dispatch(new GetAllArticlesFromDB(articles[0])));
  }
}
