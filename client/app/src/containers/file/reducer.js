// @flow
import { combineReducers } from 'redux';
import { requestsReducer } from 'redux-saga-requests';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  pipeReducers,
  getDefaultApiState,
  getDataByArraySchema,
  getDataBySchema,
  getDefaultsByArraySchema,
  getDefaultsBySchema,
  defaultReducer,
  combinePartialReducers,
  type ApiState,
} from '../../common/composite';
import catalogSchema from '../../models/catalog.schema';
import type { Catalog, CatalogArray } from '../../models/catalog.flow';
import yearSchema from '../../models/year.schema';
import type { Year, YearArray } from '../../models/year.flow';
import daySchema from '../../models/day.schema';
import type { Day, DayArray } from '../../models/day.flow';
import fotoSchema from '../../models/foto.schema';
import type { Foto, FotoArray } from '../../models/foto.flow';

import {
  GET_CATALOG_LIST,
  GET_CATALOG_ITEM,
  SELECT_CATALOG_LIST,
  SELECT_CATALOG_ITEM,
  getCatalogList,
  getCatalogItem,

  GET_YEAR_LIST,
  GET_YEAR_ITEM,
  SELECT_YEAR_LIST,
  SELECT_YEAR_ITEM,
  getYearList,
  getYearItem,
  type Action,
} from './actions';
import { FileState, type FileStateType } from './entities';
import { fillDefaults } from '../../common/json-schema';
import { arraySchema } from '../../models/common';

export type State = {
  viewState: FileStateType,
  catalogList: ApiState<CatalogArray>,
  catalogItem: ApiState<Catalog>,
  yearList: ApiState<YearArray>,
  yearItem: ApiState<Year>,
}

const initialState: State = {
  viewState: FileState.NOT_SELECTED,
  catalogList: getDefaultApiState<CatalogArray>(arraySchema(catalogSchema)),
  catalogItem: getDefaultApiState<Catalog>(catalogSchema),
  yearList: getDefaultApiState<YearArray>(arraySchema(yearSchema)),
  yearItem: getDefaultApiState<Year>(yearSchema),
  // day: defaultApiState,
  // days: defaultApiState,
  // foto: defaultApiState,
  // fotos: defaultApiState,
};

export const section = 'file';
export type StoreState = { file: State };
export const selector = (state: StoreState) => state.file;

function baseReducer(state: State, action: Action): State {
  switch (action.type) {
    case SELECT_CATALOG_ITEM: {
      const viewState = FileState.CATALOG_LIST;
      const actions = [getCatalogList()];
      return {
        ...state,
        viewState,
        actions,
      };
    }
    case SELECT_CATALOG_LIST: {
      const item = action.payload;
      const viewState = FileState.NOT_SELECTED;
      const actions = [getCatalogItem(item.name)];
      return {
        ...state,
        yearItem: initialState.yearItem,
        yearList: initialState.yearList,
        viewState,
        actions,
      };
    }
    case SELECT_YEAR_ITEM: {
      const viewState = FileState.YEAR_LIST;
      const catalogId = state.catalogItem.data.name;
      const actions = [getYearList(catalogId)];
      return {
        ...state,
        viewState,
        actions,
      };
    }
    case SELECT_YEAR_LIST: {
      const item = action.payload;
      const viewState = FileState.NOT_SELECTED;
      const catalogId = state.catalogItem.data.name;
      const actions = [getYearItem(catalogId, item.name)];
      return {
        ...state,
        viewState,
        actions,
      };
    }
    default:
      return state;
  }
}

const reducer = pipeReducers<State, Action>(
  defaultReducer(initialState),
  combinePartialReducers({
    catalogList: requestsReducer({
      actionType: GET_CATALOG_LIST,
      getDefaultData: getDefaultsByArraySchema(catalogSchema),
      getData: getDataByArraySchema(catalogSchema),
    }),
    catalogItem: requestsReducer({
      actionType: GET_CATALOG_ITEM,
      getDefaultData: getDefaultsBySchema(catalogSchema),
      getData: getDataBySchema(catalogSchema),
    }),

    yearList: requestsReducer({
      actionType: GET_YEAR_LIST,
      getDefaultData: getDefaultsByArraySchema(yearSchema),
      getData: getDataByArraySchema(yearSchema),
    }),
    yearItem: requestsReducer({
      actionType: GET_YEAR_ITEM,
      getDefaultData: getDefaultsBySchema(yearSchema),
      getData: getDataBySchema(yearSchema),
    }),
  }),
  baseReducer,
);

export default persistReducer<State, Action>({
  key: 'file',
  storage,
  whitelist: ['catalogItem', 'yearItem', 'dayItem', 'fotoItem'],
}, reducer);
