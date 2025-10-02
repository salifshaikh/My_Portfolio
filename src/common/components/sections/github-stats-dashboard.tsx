"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from 'next-themes';
import { FiGithub, FiCode, FiCalendar } from 'react-icons/fi';
import { GitHubStats } from '@/common/lib/github-service';

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
      <div className="text-center p-8">
        No GitHub statistics available
      </div>
    );
  }

  // Map each day to its contribution count
  const contributionMap = new Map();
  stats.contributions.forEach(day => {
    contributionMap.set(day.date, day.count);
  });

  // Prepare calendar dates, starting 1 year ago, ending today
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ensure date-only
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  let startDate = new Date(oneYearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // align to start-of-week

  const weeks = [];
  let currentDate = new Date(startDate);

  // Build weeks array with dates
  while (currentDate <= today) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (currentDate > today) break;
      const dateString = currentDate.toISOString().split('T')[0];
      week.push({
        date: dateString,
        count: contributionMap.get(dateString) || 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  // Calculate month label positions accurately
  const months: { label: string; position: number }[] = [];
  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstDay = week[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        months.push({ label: monthLabels[month], position: weekIndex });
        lastMonth = month;
      }
    }
  });

  // Calculate the width of the calendar for label alignment
  const weekCount = weeks.length;

  return (
    <motion.div className="space-y-8 p-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiGithub className="text-4xl" />
          <h2 className="text-3xl font-bold">GitHub Stats Dashboard</h2>
        </div>
        <a
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'salifshaikh'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
        >
          View Profile →
        </a>
      </motion.div>

      {/* Stats summary */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <FiCalendar className="text-2xl text-primary" />
            <h3 className="text-lg font-semibold">Total Contributions</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalContributions}</p>
          <p className="text-sm text-muted-foreground">Contributions</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <FiCode className="text-2xl text-primary" />
            <h3 className="text-lg font-semibold">Public Repositories</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalRepos}</p>
          <p className="text-sm text-muted-foreground">Repositories</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <FiGithub className="text-2xl text-primary" />
            <h3 className="text-lg font-semibold">Total Stars</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalStars}</p>
          <p className="text-sm text-muted-foreground">Stars</p>
        </div>
      </motion.div>

      {/* Languages Section */}
      <motion.div variants={itemVariants} className="bg-card p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Most Used Languages</h3>
        <div className="space-y-3">
          {stats.languages.map(lang => (
            <div key={lang.name} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: lang.color }} />
              <span className="flex-1">{lang.name}</span>
              <span className="font-semibold">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contribution Calendar Section */}
      <motion.div variants={itemVariants} className="bg-card p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-xl font-bold mb-4">Contribution Activity</h3>
        {/* Month Labels */}
        <div className="relative mb-2 pl-8" style={{ minWidth: 'fit-content' }}>
          <div className="flex" style={{ position: 'absolute', top: 0 }}>
            {months.map((month, i) => (
              <span
                key={i}
                className="text-xs text-muted-foreground"
                style={{
                  position: 'absolute',
                  left: `${(month.position / weekCount) * 100}%`,
                  minWidth: '32px',
                  background: 'transparent'
                }}
              >
                {month.label}
              </span>
            ))}
          </div>
        </div>
        {/* Contribution Grid */}
        <div className="flex gap-1">
          {/* Day Labels */}
          <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          {/* Calendar */}
          <div className="flex gap-[2px]" style={{ minWidth: 'fit-content' }}>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: getContributionColor(day.count, theme),
                      boxSizing: 'border-box'
                    }}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>Less</span>
          {[0, 2, 5, 10, 15].map(level => (
            <div
              key={level}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getContributionColor(level, theme) }}
            />
          ))}
          <span>More</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
