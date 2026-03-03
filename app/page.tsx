export default function Home() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="space-y-6 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
          Illustrated Data Structure
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium">
          Interactive visualizations of algorithms and data structures
        </p>
        <p className="text-zinc-500 dark:text-zinc-500 max-w-lg mt-4">
          Select an item from the left menu to start exploring.
        </p>
      </div>
    </div>
  );
}
