declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            src?: string;
            'ios-src'?: string;
            poster?: string;
            alt?: string;
            'shadow-intensity'?: string;
            exposure?: string;
            'camera-controls'?: boolean;
            'auto-rotate'?: boolean;
            ar?: boolean;
            'ar-modes'?: string;
            'ar-scale'?: string;
            'ar-placement'?: string;
            'xr-environment'?: boolean;
            'camera-orbit'?: string;
            'field-of-view'?: string;
            'interaction-prompt'?: string;
            loading?: string;
            'environment-image'?: string;
            class?: string;
            style?: React.CSSProperties;
            ref?: React.Ref<any>;
            suppressHydrationWarning?: boolean;
        };
    }
}

export { };
