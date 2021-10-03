interface UpdateData {
  [key: string]: unknown;
}

interface DbExpression {
  expression: string;
  values: { [key: string]: unknown };
}

export interface Filter<T> {
  field: keyof T;
  value: string | string[];
  op: '=' | '<>' | '<' | '<=' | '>' | '>=' | 'in';
  not?: boolean;
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
    const isListFilter = Array.isArray(filter.value);
    const { field, value, op, not } = filter;
    expr += isListFilter
      ? `${not ? 'not ' : ''}(${field} ${op} (${(value as string[])
          .map((_v, i) => `:${field}_${i}`)
          .join()})) and `
      : `${field} ${op} :${field} and `;
    if (isListFilter) {
      (value as string[]).forEach((v, i) => {
        values[`:${field}_${i}`] = v;
      });
    } else {
      values[`:${field}`] = value as string;
    }
  }

  // Remove trailing comma and space
  expr = expr.slice(0, expr.length - 5);

  console.log('FILTER EXPRESSION: ', expr);
  console.log('FILTER VALUES: ', values);

  return {
    expression: expr,
    values,
  };
}

export const buildUserId = (id: string) => 'USER#' + id;
export const buildPetId = (id: string) => 'PET#' + id;
export const buildPostId = (id: string) => 'POST#' + id;
