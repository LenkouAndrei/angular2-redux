import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {IAppStore} from '../../app/app.store';

@Component({
  selector: 'fc-source-name',
  templateUrl: './fc-source-name.html',
  styleUrls: ['./fc-source-name.less'],
})
export class FcSourceNameComponent implements OnInit {
  public sourceName$: Observable<string>;

  constructor(private store: Store<IAppStore>) {}

  public ngOnInit(): void {
    this.sourceName$ = this.store.pipe(select(state => state.newsApiArticles.sourceId));
  }
}
