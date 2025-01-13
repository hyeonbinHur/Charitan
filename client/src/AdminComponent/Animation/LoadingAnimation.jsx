import { useEffect, useState } from "react";

function LoadingAnimation({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000); // Hide tick after 1 second
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center h-16 w-16">
      {isLoading && (
        <div className="h-12 w-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
      )}
      {!isLoading && (
        <svg
          className="h-12 w-12 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
}

export default LoadingAnimation;
