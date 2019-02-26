import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IAppStore} from '../../app/app.store';
import {select, Store} from '@ngrx/store';
import {INewsAPIArticle} from '../../services/http.service';
import {combineLatest, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IDatabaseArticle} from "../../services/http.database.service";

@Component({
  selector: 'fc-articles-list',
  templateUrl: './fc-articles-list.html',
  styleUrls: ['./fc-articles-list.less'],
})
export class FcArticlesListComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  private articlesRest$: Observable<INewsAPIArticle[]>
    = this.store.pipe(select(state => state.newsApiArticles.articles));
  private articlesDB$: Observable<IDatabaseArticle[]>
    = this.store.pipe(select(state => state.databaseState.articles));
  public articles: INewsAPIArticle[];
  public wordToFilter$: Observable<string> = this.store.pipe(select(state => state.filter.word));
  public isOnlyMy$: Observable<string> = this.store.pipe(select(state => state.filter.onlyMy));

  constructor(private store: Store<IAppStore>) {}

  public ngOnInit(): void {
    combineLatest(this.articlesRest$, this.articlesDB$)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(([articlesRest, articlesDB]) => this.articles = [...articlesRest, ...articlesDB]);
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
