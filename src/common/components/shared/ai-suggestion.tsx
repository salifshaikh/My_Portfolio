"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AISuggestionProps {
  message: string;
  onApplySuggestion: (suggestion: string) => void;
}

export default function AISuggestion({ message, onApplySuggestion }: AISuggestionProps) {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestion = async () => {
    if (!message.trim()) {
      setError("Please enter a message first");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get suggestion');
      }
      
      setSuggestion(data.suggestion);
    } catch (err) {
      console.error("AI suggestion error:", err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = () => {
    if (suggestion) {
      onApplySuggestion(suggestion);
      setSuggestion(null);
    }
  };

  return (
    <div className="w-full mt-2">
      {!suggestion && !loading && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={getSuggestion}
          className={`text-sm flex items-center ${
            message.trim() 
              ? "text-blue-500 hover:text-blue-600 dark:text-cyan-400 dark:hover:text-cyan-300" 
              : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={loading || !message.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          Get AI suggestion
        </motion.button>
      )}
      
      {loading && (
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Getting suggestion...
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
      
      {suggestion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
        >
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">AI Suggestion:</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion}</p>
          <div className="flex mt-2 space-x-2">
            <button
              onClick={applySuggestion}
              className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-cyan-500 dark:hover:bg-cyan-600 transition-colors"
            >
              Apply
            </button>
            <button
              onClick={() => setSuggestion(null)}
              className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}