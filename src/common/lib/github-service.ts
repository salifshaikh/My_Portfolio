// src/common/lib/github-service.ts
import axios from 'axios';
import { graphql } from '@octokit/graphql';

// Replace with your GitHub username
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'salifshaikh';

// GitHub API endpoints
const GITHUB_API_BASE = 'https://api.github.com';
const headers = process.env.GITHUB_API_TOKEN
  ? { Authorization: `token ${process.env.GITHUB_API_TOKEN}` }
  : {};

export interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

export interface ContributionDay {
  date: string;
  count: number;
}

export interface GitHubStats {
  languages: LanguageData[];
  contributions: ContributionDay[];
  totalContributions: number;
  totalRepos: number;
  totalStars: number;
}

// Colors for common languages
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  // Add more as needed
};

// Function to fetch contributions using GraphQL
async function fetchContributions(): Promise<{ contributions: ContributionDay[], totalContributions: number }> {
  try {
    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${process.env.GITHUB_API_TOKEN}`,
      },
    });
    
    const response: { user: { contributionsCollection: { contributionCalendar: { totalContributions: number, weeks: { contributionDays: { date: string, contributionCount: number }[] }[] } } } } = await graphqlWithAuth(`
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `);
    const { user } = response;
    
    const contributions: ContributionDay[] = [];
    let totalContributions = 0;
    
    if (user.contributionsCollection) {
      totalContributions = user.contributionsCollection.contributionCalendar.totalContributions;
      
      for (const week of user.contributionsCollection.contributionCalendar.weeks) {
        for (const day of week.contributionDays) {
          contributions.push({
            date: day.date,
            count: day.contributionCount
          });
        }
      }
    }
    
    return { contributions, totalContributions };
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    // Return empty data if there's an error
    return { contributions: [], totalContributions: 0 };
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    // Fetch user profile
    const userResponse = await axios.get(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, { headers });
    const totalRepos = userResponse.data.public_repos;
    
    // Fetch repositories
    const reposResponse = await axios.get(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100`,
      { headers }
    );
    const repos = reposResponse.data;
    
    // Calculate total stars
    const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
    
    // Fetch languages
    const languagesMap: Record<string, number> = {};
    let totalBytes = 0;
    
    // Process up to 5 repos to avoid rate limiting
    const reposToProcess = repos.slice(0, 5);
    
    for (const repo of reposToProcess) {
      const langResponse = await axios.get(repo.languages_url, { headers });
      const langData = langResponse.data;
      
      for (const [lang, bytes] of Object.entries(langData)) {
        languagesMap[lang] = (languagesMap[lang] || 0) + (bytes as number);
        totalBytes += bytes as number;
      }
    }
    
    // Calculate percentages and prepare language data
    const languages: LanguageData[] = Object.entries(languagesMap)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / totalBytes) * 100),
        color: LANGUAGE_COLORS[name] || '#858585'
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
    
    // Fetch contributions using GraphQL
    const { contributions, totalContributions } = await fetchContributions();
    
    return {
      languages,
      contributions,
      totalContributions,
      totalRepos,
      totalStars
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
}