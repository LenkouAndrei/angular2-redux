import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {dateToArray} from '../utils/utils';
import {HttpDatabaseService, IDatabaseArticle} from '../services/http.database.service';
import {IAppStore} from '../app/app.store';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'fc-article-page',
  templateUrl: './fc-article-page.html',
  styleUrls: ['./fc-article-page.less'],
})
export class FcArticlePageComponent implements OnInit {
  private articleId;
  public article$: Observable<IDatabaseArticle>
    = this.store.pipe(select(state => state.databaseState.article));

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private httpDatabaseService: HttpDatabaseService,
    private store: Store<IAppStore>
  ) {}

  public ngOnInit(): void {
    this.activateRoute.paramMap
      .subscribe(params => {
        this.articleId = params.get('id');
        this.httpDatabaseService.getArticle(this.articleId);
      });
  }

  public getDate(fullDateAsString: string): string {
    const [date, time] = dateToArray(fullDateAsString);
    return date;
  }

  public getTime(fullDateAsString: string): string {
    const [date, time] = dateToArray(fullDateAsString);
    return time;
  }

  public deleteAndLeave(): void {
    this.httpDatabaseService.deleteArticle(this.articleId);
  }
}
