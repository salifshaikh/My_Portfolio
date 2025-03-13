// src/common/components/sections/github-stats-dashboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from 'next-themes';
import { FiGithub, FiCode, FiCalendar } from 'react-icons/fi';
import { GitHubStats, LanguageData, ContributionDay } from '@/common/lib/github-service';

export default function GitHubStatsDashboard() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/github-stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError('Could not load GitHub stats. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Helper function to determine color intensity based on contribution count
  const getContributionColor = (count: number, theme: string | undefined) => {
    if (count === 0) return theme === 'dark' ? '#161b22' : '#ebedf0';
    if (count < 3) return theme === 'dark' ? '#0e4429' : '#9be9a8';
    if (count < 6) return theme === 'dark' ? '#006d32' : '#40c463';
    if (count < 10) return theme === 'dark' ? '#26a641' : '#30a14e';
    return theme === 'dark' ? '#39d353' : '#216e39';
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }
  
  if (!stats || !stats.contributions || stats.contributions.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No GitHub statistics available</p>
      </div>
    );
  }
  
  // Process the contributions data to create a clean visualization
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  // Map each day to its contribution count for easy lookup
  const contributionMap = new Map();
  stats.contributions.forEach(day => {
    contributionMap.set(day.date, day.count);
  });
  
  // Create an array of weeks for the past year
  const weeks = [];
  let currentDate = new Date(oneYearAgo);
  
  // Align to the start of the week (Sunday)
  const dayOfWeek = currentDate.getDay();
  currentDate.setDate(currentDate.getDate() - dayOfWeek);
  
  // Create a week for each of the 52 weeks in a year
  while (weeks.length < 53) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const dateString = currentDate.toISOString().split('T')[0];
      week.push({
        date: dateString,
        count: contributionMap.get(dateString) || 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }
  
  // Extract months for the month labels
  const months: { label: string; position: number }[] = [];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let lastMonth = -1;
  
  weeks.forEach((week, weekIndex) => {
    const date = new Date(week[0].date);
    const month = date.getMonth();
    
    if (month !== lastMonth) {
      months.push({
        label: monthLabels[month],
        position: weekIndex
      });
      lastMonth = month;
    }
  });
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
    >
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <motion.div variants={itemVariants} className="flex items-center">
            <FiGithub className="text-2xl mr-2 text-gray-700 dark:text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">GitHub Stats Dashboard</h3>
          </motion.div>
          <motion.div variants={itemVariants}>
            <a 
              href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'salifshaikh'}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              View Profile →
            </a>
          </motion.div>
        </div>
        
        {/* Stats summary */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-500">{stats.totalContributions}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Contributions</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-500">{stats.totalRepos}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Repositories</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-500">{stats.totalStars}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Stars</div>
          </div>
        </motion.div>
        
        {/* Languages Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center mb-4">
            <FiCode className="mr-2 text-gray-700 dark:text-gray-300" />
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Most Used Languages</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.languages.map(lang => (
              <div key={lang.name} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div 
                  className="w-full h-2 rounded-full mb-2"
                  style={{ backgroundColor: lang.color }}
                ></div>
                <div className="font-medium">{lang.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{lang.percentage}%</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Contribution Calendar Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-4">
            <FiCalendar className="mr-2 text-gray-700 dark:text-gray-300" />
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Contribution Activity</h4>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
            {/* Month Labels */}
            <div className="flex text-xs text-gray-500 mb-1 pl-10">
              {months.map((month, i) => (
                <div 
                  key={i}
                  className="absolute text-xs text-gray-500"
                  style={{ 
                    left: `${(month.position / 53) * 100}%`, 
                    transform: 'translateX(-50%)' 
                  }}
                >
                  {month.label}
                </div>
              ))}
            </div>
            
            {/* Contribution Grid */}
            <div className="flex mt-6">
              {/* Day Labels */}
              <div className="flex flex-col justify-between h-28 pr-2 text-xs text-gray-500">
                <div>Mon</div>
                <div>Wed</div>
                <div>Fri</div>
              </div>
              
              {/* Calendar */}
              <div className="flex flex-1 overflow-hidden">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col">
                    {week.map((day, dayIndex) => (
                      <div 
                        key={`${weekIndex}-${dayIndex}`}
                        className="w-3 h-3 m-0.5 rounded-sm relative group"
                        style={{ backgroundColor: getContributionColor(day.count, theme) }}
                      >
                        <div className="absolute hidden group-hover:block z-10 bg-gray-800 text-white text-xs rounded p-1 -translate-y-full -translate-x-1/2 whitespace-nowrap left-1/2 top-0">
                          {day.date}: {day.count} contributions
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end mt-2">
              <span className="text-xs text-gray-500 mr-2">Less</span>
              <div className="flex">
                {[0, 2, 5, 10, 15].map(level => (
                  <div 
                    key={level}
                    className="w-3 h-3 mx-0.5 rounded-sm"
                    style={{ backgroundColor: getContributionColor(level, theme) }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2">More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}