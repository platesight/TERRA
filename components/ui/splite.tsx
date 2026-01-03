"use client";

import { Suspense, lazy, Component, ReactNode, useRef, useCallback, useState, useEffect } from 'react'
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const rafIdRef = useRef<number | undefined>(undefined);
    const lastFrameTimeRef = useRef<number>(0);

    const handleLoad = useCallback((splineApp: any) => {
        splineAppRef.current = splineApp;

        const isMobile = window.innerWidth < 768;

        // Cap DPR - 1.25 on mobile, 1.5 on desktop
        if (splineApp && typeof splineApp.setPixelRatio === 'function') {
            splineApp.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
        }
    }, []);

    // FPS throttling and visibility management
    useEffect(() => {
        if (!splineAppRef.current) return;

        const isMobile = window.innerWidth < 768;
        if (!isMobile) return; // Desktop runs at native FPS

        const splineApp = splineAppRef.current;

        // Determine target FPS based on state
        const getTargetFPS = () => {
            if (!isVisible) return 0; // Paused when not visible
            if (isScrolling) return 15; // Low FPS while scrolling
            return 30; // Normal mobile FPS
        };

        // Custom RAF loop with FPS throttling
        const animate = (currentTime: number) => {
            const targetFPS = getTargetFPS();

            if (targetFPS === 0) {
                // Paused - don't schedule next frame
                return;
            }

            const targetFrameTime = 1000 / targetFPS;
            const elapsed = currentTime - lastFrameTimeRef.current;

            if (elapsed >= targetFrameTime) {
                lastFrameTimeRef.current = currentTime - (elapsed % targetFrameTime);

                // Trigger Spline render if available
                if (typeof splineApp._render === 'function') {
                    splineApp._render();
                } else if (typeof splineApp.emitEvent === 'function') {
                    splineApp.emitEvent('update');
                }
            }

            rafIdRef.current = requestAnimationFrame(animate);
        };

        // Start custom loop
        rafIdRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [isVisible, isScrolling]);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    // Visibility detection
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className={className}>
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
                        className="w-full h-full"
                        onLoad={handleLoad}
                    />
                </Suspense>
            </SplineErrorBoundary>
        </div>
    )
}

