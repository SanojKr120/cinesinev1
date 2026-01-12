import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4ed] text-[#333] p-6 text-center">
                    <h1 className="text-4xl font-serif mb-4">Something went wrong.</h1>
                    <p className="mb-8 font-sans text-gray-600 max-w-md">
                        We apologize for the inconvenience. An unexpected error has occurred.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-[#1a1a1a] text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-[#333] transition mb-4"
                    >
                        Try Again
                    </button>
                    <a href="/" className="text-xs uppercase tracking-[0.2em] border-b border-[#333]">
                        Return to Home
                    </a>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
