import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Activity, AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CARE ACADEMY 3D uncaught error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-lg">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
              CARE ACADEMY 3D • شاشیەک روویدا
            </h1>

            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              داوای لێبۆڕینێ دکەین، هەڵەیەک ڕوویدا. تکایە دووبارە پەیجێ باربکەوە یان پشکنین بکە.
            </p>

            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>نوویکردنەوە (Reload Platform)</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
