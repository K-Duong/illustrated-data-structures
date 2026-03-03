"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Percolation as PercolationSystem } from "data-structures.ts/dist/structures/percolation/percolation";

export default function Percolation() {
  const [N, setN] = useState<number>(10);
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [isGridCreated, setIsGridCreated] = useState<boolean>(false);
  const [isSystemFinalized, setIsSystemFinalized] = useState<boolean>(false);
  
  // Memoize the percolation instance so it doesn't reset on every render
  const percolationInstance = useMemo(() => {
    if (isGridCreated) {
      const system = new PercolationSystem(N);
      // Sync the instance with the React state grid
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          if (grid[r] && grid[r][c]) {
            system.open(r, c, true);
          }
        }
      }
      return system;
    }
    return null;
  }, [N, grid, isGridCreated]);

  const handleCreateGrid = () => {
    if (N < 1 || N > 100) return;
    
    // Initialize N x N grid with false (all sites closed)
    const newGrid = Array(N)
      .fill(null)
      .map(() => Array(N).fill(false));
      
    setGrid(newGrid);
    setIsGridCreated(true);
    setIsSystemFinalized(false);
  };

  const handleToggleSite = (row: number, col: number) => {
    if (isSystemFinalized || !isGridCreated) return;
    
    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = !newGrid[row][col];
    
    setGrid(newGrid);
  };

  const handleFinalizeSystem = () => {
    setIsSystemFinalized(true);
  };

  const handleReset = () => {
    setIsGridCreated(false);
    setIsSystemFinalized(false);
    setGrid([]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Percolation</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Simulation of the percolation system using the Union-Find algorithm.
        </p>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">System Configuration</h2>
        
        {!isGridCreated ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <label htmlFor="grid-size" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Grid Size (N)
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="grid-size"
                  type="number"
                  min="1"
                  max="100"
                  value={N}
                  onChange={(e) => setN(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-24 px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-zinc-100"
                />
                <span className="text-sm text-zinc-500">× {N}</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Maximum 100 for performance reasons.</p>
            </div>
            
            <div className="mt-2 sm:mt-5 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleCreateGrid}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 w-full sm:w-auto"
              >
                Create System Manually
              </button>
              <button
                onClick={() => {
                  if (N < 1 || N > 100) return;
                  const newGrid = Array(N).fill(null).map(() => 
                    Array(N).fill(null).map(() => Math.random() > 0.5)
                  );
                  setGrid(newGrid);
                  setIsGridCreated(true);
                  setIsSystemFinalized(false);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                Auto Construction
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">
                System {N} × {N} {isSystemFinalized ? <span className="text-amber-500 dark:text-amber-400">(Locked)</span> : <span className="text-green-500 dark:text-green-400">(Building)</span>}
              </p>
              {!isSystemFinalized && (
                <p className="text-sm text-zinc-500 mt-1">Click on the sites to open or close them.</p>
              )}
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              {!isSystemFinalized && (
                <button
                  onClick={handleFinalizeSystem}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-200 dark:hover:bg-zinc-300 text-white dark:text-zinc-900 font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 flex-1 sm:flex-none"
                >
                  Finalize System
                </button>
              )}
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 flex-1 sm:flex-none"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Information Panel - shown only when system is finalized */}
      {isSystemFinalized && percolationInstance && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border rounded-xl p-6 shadow-sm ${
            percolationInstance.percolates() 
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' 
              : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {percolationInstance.percolates() ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span className="text-emerald-800 dark:text-emerald-300">The system percolates!</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span className="text-red-800 dark:text-red-300">The system does not percolate.</span>
                  </>
                )}
              </h3>
              <p className={`text-sm mt-1 ${percolationInstance.percolates() ? 'text-emerald-700 dark:text-emerald-400/80' : 'text-red-700 dark:text-red-400/80'}`}>
                {percolationInstance.percolates() 
                  ? "A valid path exists from the top to the bottom of the grid." 
                  : "No path connects the top to the bottom of the grid."}
              </p>
            </div>
            
            <div className="bg-white/50 dark:bg-black/20 rounded-lg px-4 py-3 border border-black/5 dark:border-white/5 text-center min-w-[140px]">
              <p className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">Open Sites</p>
              <p className="text-2xl font-black leading-none">{percolationInstance.numberOfOpenSites()}</p>
              <p className="text-xs opacity-60 mt-1">out of {N * N} ({Math.round((percolationInstance.numberOfOpenSites() / (N * N)) * 100)}%)</p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Grid visualization */}
      {isGridCreated && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
          <div 
            className="grid gap-px bg-zinc-300 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 mx-auto"
            style={{ 
              gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))`,
              width: 'fit-content',
              maxWidth: '100%'
            }}
          >
            {grid.map((row, rowIndex) => (
              row.map((isOpen, colIndex) => {
                // Calculate size based on N to keep the grid responsive
                const baseSize = N <= 20 ? 32 : N <= 40 ? 24 : N <= 60 ? 16 : 10;
                
                return (
                  <motion.button
                    key={`${rowIndex}-${colIndex}`}
                    initial={false}
                    animate={{ 
                      backgroundColor: isOpen 
                        ? "rgb(255, 255, 255)"  // White for open
                        : "rgb(24, 24, 27)"     // Dark gray for closed (zinc-900)
                    }}
                    transition={{ duration: 0.2 }}
                    className={`
                      ${isOpen ? 'bg-white' : 'bg-zinc-900 dark:bg-zinc-950'} 
                      ${!isSystemFinalized ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
                      transition-opacity
                    `}
                    style={{ 
                      width: `${baseSize}px`, 
                      height: `${baseSize}px`,
                    }}
                    onClick={() => handleToggleSite(rowIndex, colIndex)}
                    disabled={isSystemFinalized}
                    aria-label={`Site at row ${rowIndex}, column ${colIndex} is ${isOpen ? 'open' : 'closed'}`}
                  />
                );
              })
            ))}
          </div>
          
          <div className="mt-8 flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-zinc-900 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700"></div>
              <span>Closed Site</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-zinc-300 dark:border-zinc-700"></div>
              <span>Open Site</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
