"use client";

import { useState, useEffect } from "react";

interface DeviceCapabilities {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isWindows: boolean;
    isMacOS: boolean;
    supportsAR: boolean;
    deviceType: "mobile" | "tablet" | "desktop";
}

export function useDeviceCapabilities(): DeviceCapabilities {
    const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isIOS: false,
        isAndroid: false,
        isWindows: false,
        isMacOS: false,
        supportsAR: false,
        deviceType: "desktop",
    });

    useEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return;

        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform?.toLowerCase() || "";
        const maxTouchPoints = navigator.maxTouchPoints || 0;

        // OS Detection
        const isIOS = /iphone|ipad|ipod/.test(userAgent) || (platform === "macintel" && maxTouchPoints > 1);
        const isAndroid = /android/.test(userAgent);
        const isWindows = /win/.test(platform) || /windows/.test(userAgent);
        const isMacOS = /mac/.test(platform) && maxTouchPoints === 0;

        // Device Type Detection
        const isMobileUA = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const isTabletUA = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);

        // Screen size heuristics
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const isMobileScreen = screenWidth < 768;
        const isTabletScreen = screenWidth >= 768 && screenWidth < 1024;

        // Combine heuristics
        const isMobile = (isMobileUA || (isMobileScreen && maxTouchPoints > 0)) && !isTabletUA;
        const isTablet = isTabletUA || (isTabletScreen && maxTouchPoints > 0);
        const isDesktop = !isMobile && !isTablet;

        // AR Support Logic
        // AR is ONLY supported on mobile devices (Android Chrome or iOS Safari)
        const supportsAR = (isAndroid || isIOS) && (isMobile || isTablet);

        const deviceType: "mobile" | "tablet" | "desktop" = isMobile
            ? "mobile"
            : isTablet
                ? "tablet"
                : "desktop";

        setCapabilities({
            isMobile,
            isTablet,
            isDesktop,
            isIOS,
            isAndroid,
            isWindows,
            isMacOS,
            supportsAR,
            deviceType,
        });
    }, []);

    return capabilities;
}
