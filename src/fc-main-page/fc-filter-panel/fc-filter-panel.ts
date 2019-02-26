import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpService, INewsAPISource} from '../../services/http.service';
import {select, Store} from "@ngrx/store";
import {IAppStore} from "../../app/app.store";
import {ApplyFilterToList, OnlyMySrticlesInList} from "./fc-ngrx-filter/fc-ngrx-filter.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'fc-filter-panel',
  templateUrl: './fc-filter-panel.html',
  styleUrls: ['./fc-filter-panel.less'],
})
export class FcFilterPanelComponent implements OnInit {
  @Output()
  public onNewsSourceChange: EventEmitter<string> = new EventEmitter();

  public source = null;
  public sourceList$ = this.httpService.getSourceList();
  public isOnlyMyVisible$: Observable<boolean> = this.store.pipe(select(state => state.filter.onlyMy));
  public wordsToFind = '';

  constructor(
    private httpService: HttpService,
    private store: Store<IAppStore>
  ) {}

  public sourceChanged(currentSource: INewsAPISource): void {
    this.onNewsSourceChange.emit(currentSource.id);
  }

  public toggleCreatedByMe(): void {
    this.store.dispatch(new OnlyMySrticlesInList());
  }

  public filterByWords(wordsToFind: string): void {
    this.store.dispatch(new ApplyFilterToList(wordsToFind.trim()));
  }

  public ngOnInit(): void {
    this.store.dispatch(new ApplyFilterToList(''));
  }
}
