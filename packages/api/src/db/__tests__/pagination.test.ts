import { encodeCursor } from '@db/utils';
import { paginate } from '../pagination';

const items = [
  { key: 'item1' },
  { key: 'item2' },
  { key: 'item3' },
  { key: 'item4' },
  { key: 'item5' },
  { key: 'item6' },
  { key: 'item7' },
  { key: 'item8' },
  { key: 'item9' },
  { key: 'item10' },
  { key: 'item11' },
  { key: 'item12' },
  { key: 'item13' },
  { key: 'item14' },
  { key: 'item15' },
];

const itemsWithCompoundKeys = [
  { key: 'item1', rangeKey: 'range1' },
  { key: 'item2', rangeKey: 'range2' },
  { key: 'item3', rangeKey: 'range3' },
  { key: 'item4', rangeKey: 'range4' },
  { key: 'item5', rangeKey: 'range5' },
  { key: 'item6', rangeKey: 'range6' },
  { key: 'item7', rangeKey: 'range7' },
  { key: 'item8', rangeKey: 'range8' },
  { key: 'item9', rangeKey: 'range9' },
  { key: 'item10', rangeKey: 'range10' },
  { key: 'item11', rangeKey: 'range11' },
  { key: 'item12', rangeKey: 'range12' },
  { key: 'item13', rangeKey: 'range13' },
  { key: 'item14', rangeKey: 'range14' },
  { key: 'item15', rangeKey: 'range15' },
];

describe('Pagination', () => {
  it('paginates a list of items', () => {
    const paginated = paginate(items, { hash: 'key' }, 10);

    expect(paginated.items).toHaveLength(10);
    expect(paginated.items).toEqual(items.slice(0, 10));
    expect(paginated.cursor).toEqual(encodeCursor({ key: 'item10' }));
    expect(paginated.totalFound).toBe(15);
  });

  it('paginates a list of items into multiple pages', () => {
    let paginated = paginate(items, { hash: 'key' }, 4);

    expect(paginated.items).toHaveLength(4);
    expect(paginated.items).toEqual(items.slice(0, 4));
    expect(paginated.cursor).toEqual(encodeCursor({ key: 'item4' }));
    expect(paginated.totalFound).toBe(15);

    paginated = paginate(items, { hash: 'key' }, 4, paginated.cursor);

    expect(paginated.items).toHaveLength(4);
    expect(paginated.items).toEqual(items.slice(4, 8));
    expect(paginated.cursor).toEqual(encodeCursor({ key: 'item8' }));
    expect(paginated.totalFound).toBe(15);

    paginated = paginate(items, { hash: 'key' }, 4, paginated.cursor);

    expect(paginated.items).toHaveLength(4);
    expect(paginated.items).toEqual(items.slice(8, 12));
    expect(paginated.cursor).toEqual(encodeCursor({ key: 'item12' }));
    expect(paginated.totalFound).toBe(15);

    paginated = paginate(items, { hash: 'key' }, 4, paginated.cursor);

    expect(paginated.items).toHaveLength(3);
    expect(paginated.items).toEqual(items.slice(12));
    expect(paginated.cursor).toBeUndefined();
    expect(paginated.totalFound).toBe(15);
  });

  it('paginates a list of items with compound keys', () => {
    const paginated = paginate(
      itemsWithCompoundKeys,
      { hash: 'key', range: 'rangeKey' },
      10
    );

    expect(paginated.items).toHaveLength(10);
    expect(paginated.items).toEqual(itemsWithCompoundKeys.slice(0, 10));
    expect(paginated.cursor).toEqual(
      encodeCursor({ key: 'item10', rangeKey: 'range10' })
    );
    expect(paginated.totalFound).toBe(15);
  });

  it('paginates a list of items with compound keys into multiple pages', () => {
    let paginated = paginate(
      itemsWithCompoundKeys,
      { hash: 'key', range: 'rangeKey' },
      4
    );

    expect(paginated.items).toHaveLength(4);
    expect(paginated.items).toEqual(itemsWithCompoundKeys.slice(0, 4));
    expect(paginated.cursor).toEqual(
      encodeCursor({ key: 'item4', rangeKey: 'range4' })
    );
    expect(paginated.totalFound).toBe(15);

    paginated = paginate(
      itemsWithCompoundKeys,
      { hash: 'key', range: 'rangeKey' },
      4,
      paginated.cursor
    );

    expect(paginated.items).toHaveLength(4);
    expect(paginated.items).toEqual(itemsWithCompoundKeys.slice(4, 8));
    expect(paginated.cursor).toEqual(
      encodeCursor({ key: 'item8', rangeKey: 'range8' })
    );
    expect(paginated.totalFound).toBe(15);

    paginated = paginate(
      itemsWithCompoundKeys,
      { hash: 'key', range: 'rangeKey' },
      4,
      paginated.cursor
    );

    expect(paginated.items).toHaveLength(4);
    expect(paginated.items).toEqual(itemsWithCompoundKeys.slice(8, 12));
    expect(paginated.cursor).toEqual(
      encodeCursor({ key: 'item12', rangeKey: 'range12' })
    );
    expect(paginated.totalFound).toBe(15);

    paginated = paginate(
      itemsWithCompoundKeys,
      { hash: 'key', range: 'rangeKey' },
      4,
      paginated.cursor
    );

    expect(paginated.items).toHaveLength(3);
    expect(paginated.items).toEqual(itemsWithCompoundKeys.slice(12));
    expect(paginated.cursor).toBeUndefined();
    expect(paginated.totalFound).toBe(15);
  });
});
