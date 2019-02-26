import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FcHeaderComponent} from '../fc-shared-components/fc-header/fc-header';
import {FcFilterPanelComponent} from '../fc-main-page/fc-filter-panel/fc-filter-panel';
import {FcSourceNameComponent} from '../fc-shared-components/fc-source-name/fc-source-name';
import {FcFooterComponent} from '../fc-shared-components/fc-footer/fc-footer';
import {FcArticleComponent} from '../fc-main-page/fc-article/fc-article';
import {FcArticlePageComponent} from '../fc-article-page/fc-article-page';
import {FcEditPageComponent} from '../fc-edit-page/fc-edit-page';
import {FcArticlesListComponent} from '../fc-main-page/fc-articles-list/fc-articles-list';
import {HttpClientModule} from '@angular/common/http';
import {FcMainPageComponent} from '../fc-main-page/fc-main-page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FcFilterPipe} from '../fc-main-page/fc-filter-panel/fc-filter.pipe';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {newsApiArticlesReducer, newsApiSourcesReducer} from '../fc-ngrx-store/fc-ngrx-news-api/fc-ngrx-news-api.reducer';
import {databaseReducer} from "../fc-ngrx-store/fc-ngrx-database/fc-ngrx-database.reducer";
import {filterReducer} from "../fc-main-page/fc-filter-panel/fc-ngrx-filter/fc-ngrx-filter.reducer";

@NgModule({
  declarations: [
    AppComponent,
    FcHeaderComponent,
    FcFilterPanelComponent,
    FcSourceNameComponent,
    FcFooterComponent,
    FcArticleComponent,
    FcArticlePageComponent,
    FcEditPageComponent,
    FcArticlesListComponent,
    FcMainPageComponent,
    FcFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      newsApiArticles: newsApiArticlesReducer,
      sources: newsApiSourcesReducer,
      databaseState: databaseReducer,
      filter: filterReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Хранятся последние 25 состояний
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
