// @flow
import type { Catalog } from '../../models/catalog';

export const SELECT_CATALOG_LIST = 'SELECT_CATALOG_LIST';
export const GET_CATALOG_LIST = 'GET_CATALOG_LIST';
export const SELECT_CATALOG_ITEM = 'SELECT_CATALOG_ITEM';
export const GET_CATALOG_ITEM = 'GET_CATALOG_ITEM';

export function selectCatalogList(item: Catalog) {
  return {
    type: SELECT_CATALOG_LIST,
    payload: item,
  };
}

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

export function selectCatalogItem(item: Catalog) {
  return {
    type: SELECT_CATALOG_ITEM,
    payload: item,
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

export type Action =
  $Call<typeof selectCatalogList, Catalog>
  | $Call<typeof getCatalogList>
  | $Call<typeof selectCatalogItem, Catalog>
  | $Call<typeof getCatalogItem, string>
;
