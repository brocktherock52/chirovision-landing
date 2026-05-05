import { cn } from "@/lib/utils";

interface AssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders an image with a WebP source and JPEG fallback. Pass a JPEG/PNG src
 * and the component will look for a sibling .webp at the same path.
 */
export function AssetImage({
  src,
  alt,
  className,
  priority = false,
  ...props
}: AssetImageProps) {
  const isLocal = src.startsWith("/") && !src.startsWith("//");
  const webp = isLocal ? src.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, ".webp$2") : null;
  return (
    <picture>
      {webp && webp !== src ? <source type="image/webp" srcSet={webp} /> : null}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={cn("h-auto w-full object-cover", className)}
        {...props}
      />
    </picture>
  );
}
