import { Component, type ErrorInfo, type ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { children: ReactNode; resetKey?: string };
type State = { hasError: boolean };

class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center gap-4 min-h-[60vh] px-4 text-center"
      >
        <TriangleAlert className="text-muted-foreground size-6" />
        <h1 className="font-serif text-[30px] leading-[1.1] font-semibold tracking-[-0.025em] text-balance">
          Something went wrong
        </h1>
        <p className="text-muted-foreground">
          This page hit an unexpected error. Reload to try again.
        </p>
        <Button autoFocus onClick={() => window.location.reload()}>
          Reload
        </Button>
        <a
          href="/"
          className="underline underline-offset-4 decoration-link-underline hover:decoration-foreground"
        >
          Back to the board
        </a>
      </div>
    );
  }
}

export default AppErrorBoundary;
