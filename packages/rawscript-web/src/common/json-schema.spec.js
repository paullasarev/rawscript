import { fillDefaults } from './json-schema';
import { numberSchema, stringSchema } from '../models/common';

describe('json-schema', ()=>{
  const schemaObj = {
    type: 'object',
    properties: {
      id: numberSchema,
      name: stringSchema,
      folder: stringSchema,
    },
  };

  it('should check string schema', ()=>{
    const value = fillDefaults({type: 'string'}, 'asdf');
    expect(value).toBe('asdf');
  })
  it('should curry params', ()=>{
    const value = fillDefaults({type: 'string'})('asdf');
    expect(value).toBe('asdf');
  })
  it('should fill object', ()=>{
    const obj = { id: 1, name: 'name', folder: '/name' };
    const value = fillDefaults(schemaObj)(obj);
    expect(value).toEqual(obj);
  })
});