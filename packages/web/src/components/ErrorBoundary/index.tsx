import React from 'react';

interface Props {
  children: React.ReactNode;
  errorMessage?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: any, errorInfo: any) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    const { children, errorMessage } = this.props;
    const { hasError } = this.state;

    const message = errorMessage ?? 'Something went wrong.';

    if (hasError) {
      return <h1>{message}</h1>;
    }

    return children;
  }
}
