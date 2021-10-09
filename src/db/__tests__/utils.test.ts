import { buildUpdateExpression, FilterBuilder } from '../utils';

describe('DB utils', () => {
  describe('buildUpdateExpression()', () => {
    it('builds a DynamoDB compatible update expression', () => {
      const id = 'USER#123';
      const name = 'First Last';
      const update = {
        id,
        name,
      };

      const { expression, values } = buildUpdateExpression(update);

      expect(expression).toBe('SET id = :id, name = :name');
      expect(values).toEqual({ ':id': id, ':name': name });
    });
  });

  describe('Filter Builder', () => {
    it('creates a simple filter expression', () => {
      const filter = new FilterBuilder().equal('userId', 'user_1').build();

      expect(filter.expression).toBe('userId = :1');
      expect(filter.values).toEqual({ ':1': 'user_1' });
    });

    it('creates a filter with multiple conditions', () => {
      const filter = new FilterBuilder()
        .equal('userId', 'user_1')
        .and()
        .notEqual('name', 'Robson')
        .build();

      expect(filter.expression).toBe('userId = :1 AND name <> :2');
      expect(filter.values).toEqual({ ':1': 'user_1', ':2': 'Robson' });
    });

    it('creates a filter with an in condition', () => {
      const filter = new FilterBuilder()
        .in('userId', ['user_1', 'user_2'])
        .build();

      expect(filter.expression).toBe('userId IN (:1,:2)');
      expect(filter.values).toEqual({ ':1': 'user_1', ':2': 'user_2' });
    });

    it('creates a filter with a not in condition', () => {
      const filter = new FilterBuilder()
        .notIn('userId', ['user_1', 'user_2'])
        .build();

      expect(filter.expression).toBe('NOT (userId IN (:1,:2))');
      expect(filter.values).toEqual({ ':1': 'user_1', ':2': 'user_2' });
    });

    it('creates a filter with equal and not in condition', () => {
      const filter = new FilterBuilder()
        .equal('userId', 'user_1')
        .and()
        .notIn('petId', ['pet_1', 'pet_2'])
        .build();

      expect(filter.expression).toBe('userId = :1 AND NOT (petId IN (:2,:3))');
      expect(filter.values).toEqual({
        ':1': 'user_1',
        ':2': 'pet_1',
        ':3': 'pet_2',
      });
    });
  });
});
