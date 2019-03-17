// @flow
import type { Catalog } from '../../models/catalog.flow';
import type { Year } from '../../models/year.flow';
import type { ReturnType } from '../../common/types';

export const GET_CATALOG_LIST = 'GET_CATALOG_LIST';
export const GET_CATALOG_ITEM = 'GET_CATALOG_ITEM';
export const SELECT_CATALOG_LIST = 'SELECT_CATALOG_LIST';
export const SELECT_CATALOG_ITEM = 'SELECT_CATALOG_ITEM';

export const GET_YEAR_LIST = 'GET_YEAR_LIST';
export const GET_YEAR_ITEM = 'GET_YEAR_ITEM';
export const SELECT_YEAR_LIST = 'SELECT_YEAR_LIST';
export const SELECT_YEAR_ITEM = 'SELECT_YEAR_ITEM';

export function getCatalogList() {
  return {
    type: GET_CATALOG_LIST,
    request: {
      url: '/catalogs',
    },
    meta: {
      // abortOn: CLEAR_PHOTO,
    },
  };
}

export function getCatalogItem(id: string) {
  return {
    type: GET_CATALOG_ITEM,
    request: {
      url: `/catalogs/${id}`,
    },
    meta: {
      id,
    },
  };
}

export function selectCatalogList(item: Catalog) {
  return {
    type: SELECT_CATALOG_LIST,
    payload: item,
  };
}

export function selectCatalogItem(item: Catalog) {
  return {
    type: SELECT_CATALOG_ITEM,
    payload: item,
  };
}

export function getYearList() {
  return {
    type: GET_YEAR_LIST,
    request: {
      url: '/years',
    },
    meta: {
      // abortOn: CLEAR_PHOTO,
    },
  };
}

export function getYearItem(id: string) {
  return {
    type: GET_YEAR_ITEM,
    request: {
      url: `/years/${id}`,
    },
    meta: {
      id,
    },
  };
}

export function selectYearList(item: Year) {
  return {
    type: SELECT_YEAR_LIST,
    payload: item,
  };
}

export function selectYearItem(item: Year) {
  return {
    type: SELECT_YEAR_ITEM,
    payload: item,
  };
}

export type Action =
  | ReturnType<typeof getCatalogList>
  | ReturnType<typeof getCatalogItem>
  | ReturnType<typeof selectCatalogList>
  | ReturnType<typeof selectCatalogItem>
  | ReturnType<typeof getYearList>
  | ReturnType<typeof getYearItem>
  | ReturnType<typeof selectYearList>
  | ReturnType<typeof selectYearItem>
;
