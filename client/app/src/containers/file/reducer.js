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
import {
  catalogSchema,
  type Catalog,
  type Catalogs,
} from '../../models/catalog';

import {
  SELECT_CATALOG_LIST,
  GET_CATALOG_LIST,
  SELECT_CATALOG_ITEM,
  GET_CATALOG_ITEM,
  getCatalogList,
  getCatalogItem,
  type Action,
} from './actions';
import { FileState, type FileStateType } from './entities';
import { fillDefaults } from '../../common/json-schema';
import { arraySchema } from '../../models/common';

export type State = {
  viewState: FileStateType,
  catalogList: ApiState<Catalogs>,
  catalogItem: ApiState<Catalog>,
//   catalogList: getDefaultApiState(arraySchema(catalogSchema)),
//   catalogItem: getDefaultApiState(catalogSchema),
}

const initialState: State = {
  viewState: FileState.NOT_SELECTED,
  catalogList: getDefaultApiState<Catalogs>(arraySchema(catalogSchema)),
  catalogItem: getDefaultApiState<Catalog>(catalogSchema),
  // year: defaultApiState,
  // years: defaultApiState,
  // day: defaultApiState,
  // days: defaultApiState,
  // foto: defaultApiState,
  // fotos: defaultApiState,
};

function baseReducer(state: State, action: Action): State {
  switch (action.type) {
    case SELECT_CATALOG_ITEM: {
      const actions = [getCatalogList()];
      const viewState = FileState.CATALOG_LIST;
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
        viewState,
        actions,
      };
    }
    default:
      return state;
  }
}

const reducer = pipeReducers(
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
  }),
  baseReducer,
);

export default persistReducer<State, Action>({
  key: 'file',
  storage,
  whitelist: ['catalogItem'],
}, reducer);
