import { Maybe } from '@generated/graphql';
import { PaginatedList } from '@types';
import { DynamoDB } from 'aws-sdk';
import { decodeCursor, encodeCursor } from './utils';

interface KeyDefinition {
  hash: string;
  range?: string;
}

const compareByHashKey = (
  keyDef: KeyDefinition,
  key1: DynamoDB.DocumentClient.Key,
  key2: DynamoDB.DocumentClient.Key
): boolean => {
  return key1[keyDef.hash] === key2[keyDef.hash];
};

const compareByHashAndRangeKey = (
  keyDef: KeyDefinition,
  key1: DynamoDB.DocumentClient.Key,
  key2: DynamoDB.DocumentClient.Key
): boolean => {
  if (keyDef.range == null) {
    throw new Error('range key needs to be defined!');
  }

  return (
    compareByHashKey(keyDef, key1, key2) &&
    key1[keyDef.range] === key2[keyDef.range]
  );
};

const compareKey = (
  keyDef: KeyDefinition,
  key1: DynamoDB.DocumentClient.Key,
  key2: DynamoDB.DocumentClient.Key
): boolean => {
  if (keyDef.range != null) {
    return compareByHashAndRangeKey(keyDef, key1, key2);
  }

  return compareByHashKey(keyDef, key1, key2);
};

export function paginate<T extends { [key: string]: any }>(
  items: T[],
  keyDef: KeyDefinition,
  first: number,
  lastCursor?: Maybe<string>
): PaginatedList<T> {
  const totalFound = items.length;
  const startKey = lastCursor ? decodeCursor(lastCursor) : undefined;
  console.log('START KEY: ', startKey);
  const startKeyIndex = startKey
    ? items.findIndex((item) => compareKey(keyDef, item, startKey))
    : -1;
  console.log('START KEY INDEX: ', startKeyIndex);
  const startFromIndex = startKeyIndex === -1 ? 0 : startKeyIndex + 1;
  console.log('START FROM INDEX: ', startFromIndex);
  const firstItems = items.slice(startFromIndex, startFromIndex + first);
  console.log('FIRST ITEMS: ', firstItems);
  const lastReturnedItem = firstItems[firstItems.length - 1];
  console.log('LAST RETURNED: ', lastReturnedItem);

  const cursor =
    firstItems.length === first
      ? encodeCursor({
          [keyDef.hash]: lastReturnedItem[keyDef.hash],
          ...(keyDef.range && {
            [keyDef.range]: lastReturnedItem[keyDef.range],
          }),
        })
      : undefined;

  return { items: firstItems, cursor, totalFound };
}
