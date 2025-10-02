"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from 'next-themes';
import { FiGithub, FiCode, FiCalendar, FiExternalLink } from 'react-icons/fi';
import { GitHubStats } from '@/common/lib/github-service';
import GitHubCalendar from 'react-github-calendar';


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
        if (!response.ok) throw new Error('Failed to fetch GitHub stats');
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const getContributionColor = (count: number, theme: string | undefined) => {
    if (count === 0) return theme === 'dark' ? '#161b22' : '#ebedf0';
    if (count < 3) return theme === 'dark' ? '#0e4429' : '#9be9a8';
    if (count < 6) return theme === 'dark' ? '#006d32' : '#40c463';
    if (count < 10) return theme === 'dark' ? '#26a641' : '#30a14e';
    return theme === 'dark' ? '#39d353' : '#216e39';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        {error}
      </div>
    );
  }
  
  if (!stats || !stats.contributions || stats.contributions.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400">
        No GitHub statistics available
      </div>
    );
  }

  // Map each day to its contribution count
  const contributionMap = new Map();
  stats.contributions.forEach(day => {
    contributionMap.set(day.date, day.count);
  });

  // Build exactly 53 weeks of data
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Go back 371 days (53 weeks)
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 371);
  
  // Align to Sunday
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }
  
  const weeks = [];
  let currentDate = new Date(startDate);

  // Build 53 weeks
  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dateString = currentDate.toISOString().split('T')[0];
      const isFuture = currentDate > today;
      week.push({
        date: dateString,
        count: isFuture ? -1 : (contributionMap.get(dateString) || 0)
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  // Calculate months for labels
  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const months: { label: string; weekIndex: number }[] = [];
  
  weeks.forEach((week, weekIndex) => {
    const date = new Date(week[0].date);
    const isFirstWeekOfMonth = date.getDate() <= 7;
    
    if (isFirstWeekOfMonth && weekIndex > 0) {
      months.push({
        label: monthLabels[date.getMonth()],
        weekIndex: weekIndex
      });
    }
  });
  
  // Add first month
  if (months.length === 0 || months[0].weekIndex > 0) {
    const firstDate = new Date(weeks[0][0].date);
    months.unshift({
      label: monthLabels[firstDate.getMonth()],
      weekIndex: 0
    });
  }

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto space-y-8 p-6"
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <FiGithub className="text-4xl text-white" />
          <h2 className="text-3xl font-bold text-white">GitHub Stats Dashboard</h2>
        </div>
        <a
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'salifshaikh'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          View Profile
          <FiExternalLink className="text-sm" />
        </a>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-xl hover:border-blue-500/50 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <FiCalendar className="text-3xl text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-200">Total Contributions</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{stats.totalContributions}</p>
          <p className="text-sm text-gray-400">in the last year</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-xl hover:border-green-500/50 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <FiCode className="text-3xl text-green-400" />
            <h3 className="text-lg font-semibold text-gray-200">Public Repositories</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{stats.totalRepos}</p>
          <p className="text-sm text-gray-400">Repositories</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-xl hover:border-yellow-500/50 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <FiGithub className="text-3xl text-yellow-400" />
            <h3 className="text-lg font-semibold text-gray-200">Total Stars</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{stats.totalStars}</p>
          <p className="text-sm text-gray-400">Stars Received</p>
        </div>
      </motion.div>

      {/* Languages Section */}
      <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-white">Most Used Languages</h3>
        <div className="space-y-4">
          {stats.languages.map(lang => (
            <div key={lang.name} className="flex items-center gap-4">
              <div
                className="w-5 h-5 rounded-full shadow-md"
                style={{ backgroundColor: lang.color }}
              />
              <span className="flex-1 text-gray-200 font-medium">{lang.name}</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color 
                    }}
                  />
                </div>
                <span className="text-lg font-bold text-white min-w-[50px] text-right">
                  {lang.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contribution Calendar */}
      <motion.div variants={itemVariants} className="bg-gray-900 border text-white border-gray-800 p-6 rounded-xl shadow-xl overflow-x-auto">
        <h3 className="text-2xl font-bold mb-6 text-white">Contribution Activity</h3>
          <GitHubCalendar username="salifshaikh" />
      </motion.div>
    </motion.div>
  );
}