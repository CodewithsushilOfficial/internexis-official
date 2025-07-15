import React from "react";

export const Stats: React.FC = () => {
  // Generate string of stars for decorative elements
  const generateStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`,
          }}
        />
      ));
  };

  return (
    <section className="py-24 relative bg-gradient-to-br from-blue-50/70 to-white dark:from-gray-900 dark:to-gray-800/90">
      {/* Enhanced Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary-500/10 dark:bg-primary-400/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-secondary-500/10 dark:bg-secondary-400/10 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-accent-500/10 dark:bg-accent-400/10 blur-2xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-20 h-20 rounded-full bg-green-500/10 dark:bg-green-400/10 blur-2xl animate-pulse"
          style={{ animationDuration: "7s" }}
        />

        {/* Enhanced Grid pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-[length:40px_40px] opacity-[0.02] dark:opacity-[0.03]"></div>
        {/* Stars decorative elements */}
        <div className="hidden lg:block absolute inset-0">
          {generateStars(40)}
        </div>
      </div>
    </section>
  );
};
