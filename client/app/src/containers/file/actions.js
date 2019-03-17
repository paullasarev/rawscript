// @flow
import type { Catalog } from '../../models/catalog.flow';
import type { Year } from '../../models/year.flow';
import type { Day } from '../../models/day.flow';
import type { Foto } from '../../models/foto.flow';
import type { ReturnType } from '../../common/types';

export const GET_CATALOG_LIST = 'GET_CATALOG_LIST';
export const GET_CATALOG_ITEM = 'GET_CATALOG_ITEM';
export const SELECT_CATALOG_LIST = 'SELECT_CATALOG_LIST';
export const SELECT_CATALOG_ITEM = 'SELECT_CATALOG_ITEM';

export const GET_YEAR_LIST = 'GET_YEAR_LIST';
export const GET_YEAR_ITEM = 'GET_YEAR_ITEM';
export const SELECT_YEAR_LIST = 'SELECT_YEAR_LIST';
export const SELECT_YEAR_ITEM = 'SELECT_YEAR_ITEM';

export const GET_DAY_LIST = 'GET_DAY_LIST';
export const GET_DAY_ITEM = 'GET_DAY_ITEM';
export const SELECT_DAY_LIST = 'SELECT_DAY_LIST';
export const SELECT_DAY_ITEM = 'SELECT_DAY_ITEM';

export const GET_FOTO_LIST = 'GET_FOTO_LIST';
export const GET_FOTO_ITEM = 'GET_FOTO_ITEM';
export const SELECT_FOTO_LIST = 'SELECT_FOTO_LIST';
export const SELECT_FOTO_ITEM = 'SELECT_FOTO_ITEM';

export function getCatalogList() {
  return {
    type: GET_CATALOG_LIST,
    request: {
      url: '/catalogs',
    },
    meta: {
    },
  };
}

export function getCatalogItem(catalogId: string) {
  return {
    type: GET_CATALOG_ITEM,
    request: {
      url: `/catalogs/${catalogId}`,
    },
    meta: {
      catalogId,
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


export function getYearList(catalogId: string) {
  return {
    type: GET_YEAR_LIST,
    request: {
      url: `/catalogs/${catalogId}/years`,
    },
    meta: {
      catalogId,
    },
  };
}

export function getYearItem(catalogId: string, yearId: string) {
  return {
    type: GET_YEAR_ITEM,
    request: {
      url: `/catalogs/${catalogId}/years/${yearId}`,
    },
    meta: {
      catalogId,
      yearId,
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

export function getDayList(catalogId: string, yearId: string) {
  return {
    type: GET_DAY_LIST,
    request: {
      url: `/catalogs/${catalogId}/years/${yearId}/days`,
    },
    meta: {
      catalogId,
    },
  };
}

export function getDayItem(catalogId: string, yearId: string, dayId: string) {
  return {
    type: GET_DAY_ITEM,
    request: {
      url: `/catalogs/${catalogId}/years/${yearId}/days/${dayId}`,
    },
    meta: {
      catalogId,
      yearId,
    },
  };
}

export function selectDayList(item: Day) {
  return {
    type: SELECT_DAY_LIST,
    payload: item,
  };
}

export function selectDayItem(item: Day) {
  return {
    type: SELECT_DAY_ITEM,
    payload: item,
  };
}

export function getFotoList(catalogId: string, yearId: string, dayId: string) {
  return {
    type: GET_FOTO_LIST,
    request: {
      url: `/catalogs/${catalogId}/years/${yearId}/days/${dayId}/fotos`,
    },
    meta: {
      catalogId,
    },
  };
}

export function getFotoItem(catalogId: string, yearId: string, dayId: string, fotoId: string) {
  return {
    type: GET_FOTO_ITEM,
    request: {
      url: `/catalogs/${catalogId}/years/${yearId}/days/${dayId}/fotos/${fotoId}`,
    },
    meta: {
      catalogId,
      yearId,
    },
  };
}

export function selectFotoList(item: Foto) {
  return {
    type: SELECT_FOTO_LIST,
    payload: item,
  };
}

export function selectFotoItem(item: Foto) {
  return {
    type: SELECT_FOTO_ITEM,
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
  | ReturnType<typeof getDayList>
  | ReturnType<typeof getDayItem>
  | ReturnType<typeof selectDayList>
  | ReturnType<typeof selectDayItem>
  | ReturnType<typeof getFotoList>
  | ReturnType<typeof getFotoItem>
  | ReturnType<typeof selectFotoList>
  | ReturnType<typeof selectFotoItem>
;
