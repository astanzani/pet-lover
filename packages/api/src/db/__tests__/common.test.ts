import { FilterBuilder } from '@db/utils';
import { DynamoDB } from 'aws-sdk';

import * as DbOps from '../common';

const dynamoFn = () =>
  jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });

describe('DB common functions', () => {
  const put = dynamoFn();
  const batchWrite = dynamoFn();
  const get = dynamoFn();
  const batchGet = dynamoFn();
  const query = dynamoFn();
  const scan = dynamoFn();
  const update = dynamoFn();

  const mockItem = {
    some: 'property',
  };

  beforeEach(() => {
    jest.spyOn(DynamoDB, 'DocumentClient').mockReturnValue({
      put,
      get,
      query,
      scan,
      update,
      batchWrite,
      batchGet,
    } as any);
    jest.clearAllMocks();
  });
  describe('create()', () => {
    it('creates a single item on the DB', async () => {
      await DbOps.create('table', mockItem);

      expect(put).toBeCalledWith(
        expect.objectContaining({ TableName: 'table', Item: mockItem })
      );
    });

    it('creates a few items on the DB', async () => {
      const otherItem = {
        some: 'other property',
      };
      await DbOps.create('table', [mockItem, otherItem]);

      expect(batchWrite).toBeCalledTimes(1);
      expect(batchWrite).toBeCalledWith({
        RequestItems: {
          table: [
            {
              PutRequest: {
                Item: mockItem,
              },
            },
            {
              PutRequest: {
                Item: otherItem,
              },
            },
          ],
        },
      });
    });

    it('creates many items on the DB', async () => {
      const manyItems = new Array(30).fill(null).map((_, index) => ({
        index,
      }));
      await DbOps.create('table', manyItems);

      expect(batchWrite).toBeCalledTimes(2);
      expect(batchWrite.mock.calls[0][0].RequestItems.table.length).toBe(25);
      expect(batchWrite.mock.calls[1][0].RequestItems.table.length).toBe(5);
    });
  });

  describe('get()', () => {
    it('fetches a single item from DB', async () => {
      await DbOps.get('table', { some: 'key' });

      expect(get).toBeCalledWith({ TableName: 'table', Key: { some: 'key' } });
    });

    it('fetches many items from DB', async () => {
      await DbOps.get('table', [{ some: 'key' }, { some: 'other key' }]);

      expect(batchGet).toBeCalledWith({
        RequestItems: {
          table: {
            Keys: [{ some: 'key' }, { some: 'other key' }],
          },
        },
      });
    });
  });

  describe('query', () => {
    it('queries the DB', async () => {
      await DbOps.query('table', { key: 'value' });

      expect(query).toBeCalledWith({
        TableName: 'table',
        KeyConditionExpression: 'key = :v1',
        ExpressionAttributeValues: {
          ':v1': 'value',
        },
        IndexName: undefined,
        ScanIndexForward: true,
      });
    });

    it('queries the DB using an inverted index', async () => {
      await DbOps.query('table', { key: 'value' }, true);

      expect(query).toBeCalledWith({
        TableName: 'table',
        KeyConditionExpression: 'key = :v1',
        ExpressionAttributeValues: {
          ':v1': 'value',
        },
        IndexName: 'inverted-index',
        ScanIndexForward: true,
      });
    });
  });

  describe('scan()', () => {
    it('scans the DB', async () => {
      await DbOps.scan('table');

      expect(scan).toBeCalledWith({ TableName: 'table' });
    });

    it('scans the DB starting from key', async () => {
      await DbOps.scan('table');

      expect(scan).toBeCalledWith({
        TableName: 'table',
      });
    });

    it('scans the DB applying a filter function', async () => {
      const filter = new FilterBuilder().equal('key', 'value').build();

      await DbOps.scan('table', filter);

      expect(scan).toBeCalledWith({
        TableName: 'table',
        FilterExpression: filter?.expression,
        ExpressionAttributeValues: filter?.values,
      });
    });
  });
});
