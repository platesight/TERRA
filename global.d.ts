declare namespace JSX {
    interface IntrinsicElements {
        "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            src?: string;
            "ios-src"?: string;
            poster?: string;
            alt?: string;
            "shadow-intensity"?: string | number;
            "camera-controls"?: boolean;
            "auto-rotate"?: boolean;
            ar?: boolean;
            "ar-modes"?: string;
            "ar-scale"?: string;
            reveal?: string;
            loading?: "auto" | "lazy" | "eager";
            "camera-orbit"?: string;
            "field-of-view"?: string;
            "environment-image"?: string;
            "interaction-prompt"?: "auto" | "when-focused" | "none";
            class?: string;
            slot?: string;
            // Add other props as needed
        };
    }
}
