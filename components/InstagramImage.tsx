'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface InstagramImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
}

export default function InstagramImage({
    src,
    alt,
    width,
    height,
    className = '',
    fill = false,
    sizes,
    priority = false
}: InstagramImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [useProxy, setUseProxy] = useState(false);

    // Check if this is an Instagram URL
    const isInstagramUrl = src.includes('cdninstagram.com') || src.includes('instagram.com');

    useEffect(() => {
        if (isInstagramUrl) {
            // Test if the Instagram image loads directly
            const img = new window.Image();
            img.onload = () => {
                // Direct Instagram URL works
                setImageSrc(src);
                setUseProxy(false);
            };
            img.onerror = () => {
                // Direct Instagram URL failed, use proxy
                const proxyUrl = `/api/instagram-proxy?url=${encodeURIComponent(src)}`;
                setImageSrc(proxyUrl);
                setUseProxy(true);
            };
            img.src = src;
        }
    }, [src, isInstagramUrl]);

    const handleError = () => {
        if (isInstagramUrl && !useProxy) {
            // If direct Instagram URL fails, try proxy
            const proxyUrl = `/api/instagram-proxy?url=${encodeURIComponent(src)}`;
            setImageSrc(proxyUrl);
            setUseProxy(true);
        } else {
            // Show fallback - could implement a placeholder image
            console.error('Image failed to load:', src);
        }
    };

    if (fill) {
        return (
            <Image
                src={imageSrc}
                alt={alt}
                className={className}
                onError={handleError}
                priority={priority}
                fill
                {...(sizes && { sizes })}
            />
        );
    }

    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={width || 800}
            height={height || 600}
            className={className}
            onError={handleError}
            priority={priority}
            {...(sizes && { sizes })}
        />
    );
}