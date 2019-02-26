import {Action} from '@ngrx/store';

export enum FcNgrxFilters {
  WORD_FILTER = 'WORD_FILTER',
  ONLY_MY = 'ONLY_MY'
}

export class ApplyFilterToList implements Action {
  public readonly type = FcNgrxFilters.WORD_FILTER;
  constructor(public payload: string) {}
}

export class OnlyMySrticlesInList implements Action {
  public readonly type = FcNgrxFilters.ONLY_MY;
  constructor() {}
}
