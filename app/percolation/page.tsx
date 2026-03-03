"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Percolation() {
  const [N, setN] = useState<number>(10);
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [isGridCreated, setIsGridCreated] = useState<boolean>(false);
  const [isSystemFinalized, setIsSystemFinalized] = useState<boolean>(false);

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
          Simulation du système de percolation à l'aide de l'algorithme Union-Find.
        </p>
      </div>
      
      {/* Configuration Section */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Configuration du système</h2>
        
        {!isGridCreated ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <label htmlFor="grid-size" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Taille de la grille (N)
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
              <p className="text-xs text-zinc-500 mt-1">Maximum 100 pour des raisons de performance.</p>
            </div>
            
            <button
              onClick={handleCreateGrid}
              className="mt-2 sm:mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 w-full sm:w-auto"
            >
              Créer le système
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">
                Système {N} × {N} {isSystemFinalized ? <span className="text-amber-500 dark:text-amber-400">(Verrouillé)</span> : <span className="text-green-500 dark:text-green-400">(En construction)</span>}
              </p>
              {!isSystemFinalized && (
                <p className="text-sm text-zinc-500 mt-1">Cliquez sur les cases pour les ouvrir ou les fermer.</p>
              )}
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              {!isSystemFinalized && (
                <button
                  onClick={handleFinalizeSystem}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-200 dark:hover:bg-zinc-300 text-white dark:text-zinc-900 font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 flex-1 sm:flex-none"
                >
                  Terminer la construction
                </button>
              )}
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 flex-1 sm:flex-none"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        )}
      </div>
      
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
              <span>Site fermé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-zinc-300 dark:border-zinc-700"></div>
              <span>Site ouvert</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
