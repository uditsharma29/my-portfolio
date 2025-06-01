import { NextResponse } from 'next/server';
import type { GitHubRepo } from '@/types'; // Assuming your types file is correctly aliased

// Define types for the GraphQL response structure
interface GraphQLTopicNode {
  topic: {
    name: string;
  };
}

interface GraphQLRepositoryTopicNodes {
  nodes: GraphQLTopicNode[];
}

interface GraphQLPrimaryLanguage {
  name: string;
}

interface GraphQLPinnedRepositoryNode {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage?: GraphQLPrimaryLanguage | null;
  repositoryTopics?: GraphQLRepositoryTopicNodes | null;
}

interface GraphQLPinnedItems {
  nodes: (GraphQLPinnedRepositoryNode | null)[];
}

interface GraphQLUser {
  pinnedItems: GraphQLPinnedItems;
}

interface GraphQLResponseData {
  user?: GraphQLUser;
}

// Define a more specific type for GraphQL errors
interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: Record<string, unknown>; // Use Record<string, unknown> for flexible extensions
}

interface GraphQLResponse {
  data?: GraphQLResponseData;
  errors?: GraphQLError[]; // Use the defined GraphQLError type
}

const GITHUB_USERNAME = 'uditsharma29';

async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    console.error('API Route: GitHub token is not set.');
    // In a real app, you might return a specific error response or status code
    return []; 
  }

  const query = `
    query GetUserPinnedRepos($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) { # Fetch up to 6 pinned items
          nodes {
            ... on Repository {
              id
              name
              description
              url
              stargazerCount
              primaryLanguage {
                name
              }
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${githubToken}`,
        // Add a User-Agent header, as GitHub API recommends it
        'User-Agent': `NextJsPortfolio-${GITHUB_USERNAME}` 
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
      // Consider revalidation for API routes if needed, though data is fetched by client here
      // For server-to-server, fetch has revalidate options. Here, client controls refetch.
    });

    if (!res.ok) {
      console.error('API Route: Failed to fetch pinned repos from GitHub GraphQL API:', res.status, await res.text());
      return [];
    }

    const jsonResponse: GraphQLResponse = await res.json();
    
    if (jsonResponse.errors) {
      console.error('API Route: GitHub GraphQL API errors:', jsonResponse.errors);
      return [];
    }

    const pinnedRepoNodes = jsonResponse.data?.user?.pinnedItems?.nodes || [];
    
    return pinnedRepoNodes
      .filter((node): node is GraphQLPinnedRepositoryNode => node !== null) // Type guard
      .map((node: GraphQLPinnedRepositoryNode): GitHubRepo => ({
        id: node.id,
        name: node.name,
        description: node.description,
        html_url: node.url,
        stargazers_count: node.stargazerCount,
        language: node.primaryLanguage?.name || null,
        topics: node.repositoryTopics?.nodes?.map((topicNode: GraphQLTopicNode) => topicNode.topic.name) || [],
      }));

  } catch (error) {
    console.error('API Route: Error fetching GitHub pinned repos:', error);
    return [];
  }
}

export async function GET() {
  // You could add caching headers here if desired
  // e.g., response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  const repos = await fetchPinnedRepos();
  return NextResponse.json(repos);
} 