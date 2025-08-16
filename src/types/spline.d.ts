declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': {
      url: string;
      className?: string;
      style?: React.CSSProperties;
    };
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string;
        className?: string;
        style?: React.CSSProperties;
      };
    }
  }
}
