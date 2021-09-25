import { buildUpateExpression, buildFilterExpression } from '../utils';

describe('DB utils', () => {
  describe('buildUpdateExpression()', () => {
    it('builds a DynamoDB compatible update expression', () => {
      const id = 'USER#123';
      const name = 'First Last';
      const update = {
        id,
        name,
      };

      const { expression, values } = buildUpateExpression(update);

      expect(expression).toBe('SET id = :id, name = :name');
      expect(values).toEqual({ ':id': id, ':name': name });
    });
  });

  describe('buildFilterExpression()', () => {
    it('builds a DynamoDB compatible filter expression', () => {
      const filter1 = {
        field: 'id',
        value: 'USER#123',
        op: '=' as const,
      };
      const filter2 = {
        field: 'name',
        value: 'First Last',
        op: '<>' as const,
      };

      const { expression, values } = buildFilterExpression([filter1, filter2]);

      expect(expression).toBe('id = :id, name <> :name');
      expect(values).toEqual({ ':id': 'USER#123', ':name': 'First Last' });
    });
  });
});
