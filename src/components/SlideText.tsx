import { useEffect, useState } from "react";
import { Rect, useRect } from "react-use-rect";

const SlideText = ({ source }: { source: string[] }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [rectRef] = useRect(setRect);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((index) => (index + 1) % source.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [source]);

  return (
    <div
      style={{
        position: "relative",
        minWidth: "100%",
        height: `${rect?.height}px`,
        overflow: "hidden", // Ensure no overflow
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: `scroll ${source.length * 5}s linear infinite`,
          willChange: "transform", // Optimize performance on mobile
          gap: "5rem",
        }}
      >
        {source.map((text, index) => (
          <span
            key={index}
            ref={currentItemIndex === index ? rectRef : null}
            style={{
              maxWidth: "100%",
              textAlign: "center",
              opacity: currentItemIndex === index ? 1 : 1,
            }}
          >
            {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
              transform: translateX(-${(source.length * 100) / 2}%);
            }
        }
      `}</style>
    </div>
  );
};

export default SlideText;
