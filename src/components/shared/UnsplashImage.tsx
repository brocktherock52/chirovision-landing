import { cn } from "@/lib/utils";

interface UnsplashImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function UnsplashImage({
  src,
  alt,
  className,
  priority = false,
  ...props
}: UnsplashImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={cn("h-auto w-full object-cover", className)}
      {...props}
    />
  );
}
