export const SELECT_CATALOG_LIST = 'SELECT_CATALOG_LIST';
export const GET_CATALOG_LIST = 'GET_CATALOG_LIST';
export const SELECT_CATALOG_ITEM = 'SELECT_CATALOG_ITEM';
export const GET_CATALOG_ITEM = 'GET_CATALOG_ITEM';

export function selectCatalogList(item) {
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

export function selectCatalogItem(item) {
  return {
    type: SELECT_CATALOG_ITEM,
    payload: item,
  };
}

export function getCatalogItem(id) {
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
