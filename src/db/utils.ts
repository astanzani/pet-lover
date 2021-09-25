interface UpdateData {
  [key: string]: unknown;
}

interface DbExpression {
  expression: string;
  values: { [key: string]: unknown };
}

interface FilterExpression {
  expression: string;
  values: { [key: string]: unknown };
}

export interface Filter<T> {
  field: keyof T;
  value: string;
  op: '=' | '<>' | '<' | '<=' | '>' | '>=';
}

export const buildUpateExpression = (data: UpdateData): DbExpression => {
  let expr = 'SET ';
  let values: { [key: string]: unknown } = {};

  for (const [key, value] of Object.entries(data)) {
    expr += `${key} = :${key}, `;
    values[`:${key}`] = value;
  }

  // Remove trailing comma and space
  expr = expr.slice(0, expr.length - 2);

  return {
    expression: expr,
    values,
  };
};

export function buildFilterExpression<T>(filters: Filter<T>[]): DbExpression {
  let expr = '';
  let values: { [key: string]: string } = {};

  for (const filter of filters) {
    const { field, value, op } = filter;
    expr += `${field} ${op} :${field}, `;
    values[`:${field}`] = value;
  }

  // Remove trailing comma and space
  expr = expr.slice(0, expr.length - 2);

  return {
    expression: expr,
    values,
  };
}
