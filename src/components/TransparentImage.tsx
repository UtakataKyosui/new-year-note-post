import React, { useEffect, useRef, useState } from 'react';

interface TransparentImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    threshold?: number; // 0-255, how "white" a pixel needs to be to become transparent
}

const TransparentImage: React.FC<TransparentImageProps> = ({ src, threshold = 240, className, alt, ...props }) => {
    const [processedSrc, setProcessedSrc] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Check if pixel is close to white
                if (r > threshold && g > threshold && b > threshold) {
                    data[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }

            ctx.putImageData(imageData, 0, 0);
            setProcessedSrc(canvas.toDataURL());
        };
    }, [src, threshold]);

    if (!processedSrc) return null; // Or a placeholder/loading state

    return <img src={processedSrc} alt={alt} className={className} {...props} />;
};

export default TransparentImage;
