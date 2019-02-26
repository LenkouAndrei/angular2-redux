import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {HttpDatabaseService} from '../services/http.database.service';

@Component({
  selector: 'fc-main-page',
  templateUrl: './fc-main-page.html',
  styleUrls: ['./fc-main-page.less'],
})
export class FcMainPageComponent implements OnInit {
  private currentLoadedArticlesAmount = 0;
  private loadedArticlesAmountAtTime = 10;
  private defaultNewsChanel = 'bbc-news';
  private currentNewsChannel = 'bbc-news';
  public isOnlyMyArticles;
  public readonly loadMore = 'Load More';

  constructor(
    private httpService: HttpService,
    private httpDatabaseService: HttpDatabaseService,
  ) {}

  public ngOnInit(): void {
    this.currentLoadedArticlesAmount = this.loadedArticlesAmountAtTime;
    this.httpService.getArticlesBySourceId(this.defaultNewsChanel, this.currentLoadedArticlesAmount );
    this.httpDatabaseService.getAllArticles();
  }

  public loadNews(sourceId: string): void {
    this.currentNewsChannel = sourceId;
    this.currentLoadedArticlesAmount = this.loadedArticlesAmountAtTime;
    this.httpService.getArticlesBySourceId(this.currentNewsChannel, this.currentLoadedArticlesAmount);
  }

  public loadMoreArticles() {
    this.currentLoadedArticlesAmount += this.loadedArticlesAmountAtTime;
    this.httpService.getArticlesBySourceId(this.currentNewsChannel, this.currentLoadedArticlesAmount);
  }
}
