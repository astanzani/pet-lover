interface UpdateData {
  [key: string]: unknown;
}

interface ExpressionValues {
  [key: string]: string;
}
export interface DbExpression {
  expression: string;
  values: { [key: string]: unknown };
}

interface BuilderConditions {
  equal(field: string, value: string): BuilderConnectors;
  notEqual(field: string, value: string): BuilderConnectors;
  in(field: string, values: string[]): BuilderConnectors;
  notIn(field: string, values: string[]): BuilderConnectors;
  // TODO: whatever else needed, e.g., greaterThan, between, etc.
}

interface BuilderConnectors {
  and(): BuilderConditions;
  // TODO: or().
  build(): DbExpression;
}

class Builder implements BuilderConditions, BuilderConnectors {
  private expression = '';
  private values: ExpressionValues = {};
  private position = 0;

  public equal(field: string, value: string): BuilderConnectors {
    const paramKey = this.getNextParamKey();
    this.expression += `${field} = ${paramKey}`;
    this.values[paramKey] = value;

    return this;
  }

  public notEqual(field: string, value: string): BuilderConnectors {
    const paramKey = this.getNextParamKey();
    this.expression += `${field} <> ${paramKey}`;
    this.values[paramKey] = value;

    return this;
  }

  public in(field: string, values: string[]): BuilderConnectors {
    this.expression += `${field} IN (`;

    values.forEach((value, index) => {
      const paramKey = this.getNextParamKey();
      this.expression += `${paramKey}`;
      this.values[paramKey] = value;
      if (index !== values.length - 1) {
        this.expression += ',';
      }
    });

    this.expression += ')';

    return this;
  }

  public notIn(field: string, values: string[]): BuilderConnectors {
    this.expression += `NOT (${field} IN (`;

    values.forEach((value, index) => {
      const paramKey = this.getNextParamKey();
      this.expression += `${paramKey}`;
      this.values[paramKey] = value;
      if (index !== values.length - 1) {
        this.expression += ',';
      }
    });

    this.expression += '))';

    return this;
  }

  public and(): BuilderConditions {
    this.expression += ' AND ';

    return this;
  }

  public build() {
    return {
      expression: this.expression,
      values: this.values,
    };
  }

  private getNextParamKey() {
    return `:${++this.position}`;
  }
}

export const FilterBuilder = Builder as new () => BuilderConditions;

export const buildUpdateExpression = (data: UpdateData): DbExpression => {
  let expression = 'SET ';
  let values: { [key: string]: unknown } = {};
  const attributesCount = Object.entries(data).length;

  for (const [index, [key, value]] of Object.entries(data).entries()) {
    const paramKey = `:${key}`;
    expression += `${key} = ${paramKey}`;
    values[paramKey] = value;
    if (index !== attributesCount - 1) {
      expression += ', ';
    }
  }

  return {
    expression,
    values,
  };
};

export const idFromTokenUserId = (id: string) => 'USER#' + id;
