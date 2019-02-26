import {Component, Input} from '@angular/core';
import {dateToArray} from '../../utils/utils';
import {IAppStore} from "../../app/app.store";
import {Store} from "@ngrx/store";
import {GetAllArticlesFromDB, GetArticleFromDB} from "../../fc-ngrx-store/fc-ngrx-database/fc-ngrx-database.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'fc-article',
  templateUrl: './fc-article.html',
  styleUrls: ['./fc-article.less'],
})
export class FcArticleComponent {
  @Input()
  public article;

  constructor(
    private store: Store<IAppStore>,
    private router: Router
  ) {}

  public getDate(fullDateAsString: string): string {
    const [date, time] = dateToArray(fullDateAsString);
    return date;
  }

  public getTime(fullDateAsString: string): string {
    const [date, time] = dateToArray(fullDateAsString);
    return time;
  }

  public deleteItem(): void {
    console.log('Deleted!!!');
  }

  public setArticleToStoreAndGoToEditPage(): void {
    this.store.dispatch(new GetArticleFromDB(this.article));
    this.router.navigate(['/edit']);
  }
}
