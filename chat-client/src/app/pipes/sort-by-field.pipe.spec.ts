/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SortByFieldPipe } from './sort-by-field.pipe';

describe('Pipe: SortByFielde', () => {
  const pipe = new SortByFieldPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('order [c, a, B, ba] to [a, B, ba, c]', () => {
    expect(pipe.transform(['c', 'a', 'B', 'ba'])).toEqual(['a', 'B', 'ba', 'c']);
  });

  it('order [5, 7, 1] to [1, 5, 7]', () => {
    expect(pipe.transform([5, 7, 1])).toEqual([1, 5, 7]);
  });

  it('order reverse [c, a, B, ba] to [a, B, ba, c]', () => {
    expect(pipe.transform(['c', 'a', 'B', 'ba'], null, true)).toEqual(['c', 'ba', 'B', 'a']);
  });

  it('order reverse [5, 7, 1] to [1, 5, 7]', () => {
    expect(pipe.transform([5, 7, 1], null, true)).toEqual([7, 5, 1]);
  });

  it('should order object by name', () => {
    const array = pipe.transform([{name: 'toto', age: 1}, {name: 'babar', age: 2}, {name: 'soso', age: 3}], 'name');
    expect(array.length).toBe(3);
    expect(array[0].name).toBe('babar');
    expect(array[1].name).toBe('soso');
    expect(array[2].name).toBe('toto');
  });

  it('should order reverse object by name', () => {
    const array = pipe.transform([{name: 'toto', age: 1}, {name: 'babar', age: 2}, {name: 'soso', age: 3}], 'name', true);
    expect(array.length).toBe(3);
    expect(array[0].name).toBe('toto');
    expect(array[1].name).toBe('soso');
    expect(array[2].name).toBe('babar');
  });

});
