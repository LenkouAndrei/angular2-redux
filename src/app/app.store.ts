import {IAddArticlesToListPayload} from '../fc-ngrx-store/fc-ngrx-news-api/fc-ngrx-news-api.actions';
import {INewsAPISource} from '../services/http.service';
import {IDatabaseState} from '../fc-ngrx-store/fc-ngrx-database/fc-ngrx-database.reducer';
import {IFilterOptions} from '../fc-main-page/fc-filter-panel/fc-ngrx-filter/fc-ngrx-filter.reducer';

export interface IAppStore {
  newsApiArticles: IAddArticlesToListPayload;
  sources: INewsAPISource[];
  databaseState: IDatabaseState;
  filter: IFilterOptions;
}
