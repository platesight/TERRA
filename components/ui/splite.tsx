"use client";

import { Suspense, lazy, Component, ReactNode, useRef, useCallback } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
}

class SplineErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("Spline Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex items-center justify-center bg-black/20">
                    {/* Silent fallback - just transparent or placeholder */}
                </div>
            )
        }
        return this.props.children;
    }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    const splineAppRef = useRef<any>(null);

    const handleLoad = useCallback((splineApp: any) => {
        splineAppRef.current = splineApp;
        if (splineApp && typeof splineApp.setPixelRatio === 'function') {
            splineApp.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }
    }, []);

    return (
        <SplineErrorBoundary>
            <Suspense
                fallback={
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="loader"></span>
                    </div>
                }
            >
                <Spline
                    scene={scene}
                    className={className}
                    onLoad={handleLoad}
                />
            </Suspense>
        </SplineErrorBoundary>
    )
}

