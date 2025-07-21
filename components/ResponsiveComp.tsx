'use client'

import useWindowSize from "@/lib/hooks/useWindowSize";

export default function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
      <p>{width > 768 ? 'Desktop view' : 'Mobile view'}</p>
    </div>
  );
}