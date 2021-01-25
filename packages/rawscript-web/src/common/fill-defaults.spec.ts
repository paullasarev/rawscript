import { fillDefaults } from './fill-defaults';
import {
  arraySchema,
  numberSchema,
  stringSchema,
  dateSchema,
  arrayToByIdSchema,
} from './json-schema';

describe('fillDefaults', () => {
  const schemaObj = {
    type: 'object',
    properties: {
      id: numberSchema,
      name: stringSchema,
      folder: stringSchema,
    },
  };

  describe('object', () => {
    it('should fill object', () => {
      const obj = { id: 1, name: 'name', folder: '/name' };
      const value = fillDefaults(schemaObj)(obj);
      expect(value).toEqual(obj);
    });
  });

  describe('string', () => {
    it('should check string schema', () => {
      const value = fillDefaults({ type: 'string' })('asdf');
      expect(value).toBe('asdf');
    });
    it('should set string type', () => {
      const value = fillDefaults({ type: 'string' })(10);
      expect(value).toBe('10');
    });
  });

  describe('number', () => {
    it('should set number type', () => {
      const value = fillDefaults({ type: 'number' })('10');
      expect(value).toBe(10);
    });
    it('should set number NaN', () => {
      const value = fillDefaults({ type: 'number' })('asdf');
      expect(value).toBe(NaN);
    });
  });

  describe('integer', () => {
    it('should set number type', () => {
      const value = fillDefaults({ type: 'integer' })('10');
      expect(value).toBe(10);
    });
    it('should set 0 for undefined', () => {
      const value = fillDefaults({ type: 'integer' })(undefined);
      expect(value).toBe(0);
    });
  });

  describe('array', () => {
    it('should check array', () => {
      const value = fillDefaults(arraySchema({ type: 'string' }))(undefined);
      expect(value).toEqual([]);
    });
    it('should fill array', () => {
      const value = fillDefaults(arraySchema({ type: 'string' }))([11, 'asdf']);
      expect(value).toEqual(['11', 'asdf']);
    });
    it('should fill undefined array', () => {
      const value = fillDefaults(arraySchema({ type: 'string' }, null as any))(undefined);
      expect(value).toEqual([]);
    });
    it('should fill null array', () => {
      const value = fillDefaults(arraySchema({ type: 'string' }))(null);
      expect(value).toEqual([]);
    });
  });

  describe('date', () => {
    it('should be empty for empty', () => {
      expect(fillDefaults(dateSchema)(undefined)).toBeUndefined();
    });
    it('should keep value empty for defined', () => {
      expect(fillDefaults(dateSchema)('2018')).toBe('2018');
    });
  });

  describe('array to byId', () => {
    it('should return object with Id as keys', () => {
      const array = [
        { Id: '01', payload: 'payload 1' },
        { Id: '02', payload: 'payload 2' },
      ];
      const value = fillDefaults(arrayToByIdSchema(schemaObj))(array);
      expect(value).toEqual({ '01': array[0], '02': array[1] });
    });
    it('should return object for undefined data', () => {
      const value = fillDefaults(arrayToByIdSchema(schemaObj, null as any))(undefined);
      expect(value).toEqual({});
    });
    it('should return object for null data', () => {
      const value = fillDefaults(arrayToByIdSchema(schemaObj))(null);
      expect(value).toEqual({});
    });
  });
});
