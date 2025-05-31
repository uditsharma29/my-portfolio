import { GitHubRepo } from '@/types'; // Assuming types.ts is in src
import Link from 'next/link';
import { notFound } from 'next/navigation';

const GITHUB_USERNAME = 'uditsharma29'; // Your GitHub username

async function getSingleRepoDetails(repoName: string): Promise<GitHubRepo | null> {
  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    console.error('GitHub token is not set. Please set GITHUB_TOKEN environment variable.');
    return null;
  }

  const query = `
    query GetSingleRepository($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
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
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${githubToken}`,
      },
      body: JSON.stringify({
        query,
        variables: { owner: GITHUB_USERNAME, name: repoName },
      }),
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
      console.error(`Failed to fetch repo ${repoName} from GitHub GraphQL API:`, res.status, await res.text());
      return null;
    }

    const jsonResponse = await res.json();

    if (jsonResponse.errors) {
      console.error(`GitHub GraphQL API errors for ${repoName}:`, jsonResponse.errors);
      return null;
    }

    const repoData = jsonResponse.data?.repository;

    if (!repoData) {
      console.warn(`Repository ${repoName} not found or not accessible.`);
      return null;
    }

    return {
      id: repoData.id,
      name: repoData.name,
      description: repoData.description,
      html_url: repoData.url,
      stargazers_count: repoData.stargazerCount,
      language: repoData.primaryLanguage?.name || null,
      topics: repoData.repositoryTopics?.nodes?.map((topicNode: any) => topicNode.topic.name) || [],
    };

  } catch (error) {
    console.error(`Error fetching GitHub repo ${repoName}:`, error);
    return null;
  }
}

interface ProjectPageParams {
  projectName: string;
}

interface ProjectPageProps {
  params: ProjectPageParams;
}

// Function to generate metadata dynamically
export async function generateMetadata({ params }: ProjectPageProps) {
  const repoName = decodeURIComponent(params.projectName);
  // For a better title, we might fetch the repo data here too, or pass parts of it.
  // For now, just using the name.
  const repo = await getSingleRepoDetails(repoName); // Fetch details for metadata
  
  if (!repo) {
    return {
      title: "Project Not Found | Udit Sharma",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${repo.name} - Project Details | Udit Sharma`,
    description: repo.description || `Details for the project ${repo.name} by Udit Sharma.`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const repoName = decodeURIComponent(params.projectName);
  const repo = await getSingleRepoDetails(repoName);

  if (!repo) {
    notFound(); // If repo not found, show a 404 page
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="py-8 text-center">
          <div className="text-left mb-4">
            <Link href="/" className="text-blue-400 hover:underline">&larr; Back to All Projects</Link>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mt-4">{repo.name}</h1>
          <div className="mt-6">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md text-base font-medium transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </header>

        <main className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg mt-8">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-400 mb-3">Description</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {repo.description || 'No detailed description available.'}
            </p>
          </section>

          {repo.language && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-400 mb-3">Language</h2>
              <p className="text-gray-300">{repo.language}</p>
            </section>
          )}

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-400 mb-3">Stars</h2>
            <p className="text-gray-300">{repo.stargazers_count}</p>
          </section>

          {repo.topics && repo.topics.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-400 mb-3">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {repo.topics.map((topic) => (
                  <span key={topic} className="text-sm bg-gray-700 px-3 py-1 rounded-full text-gray-300">
                    {topic}
                  </span>
                ))}
              </div>
            </section>
          )}
        </main>

        <footer className="py-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Udit Sharma</p>
        </footer>
      </div>
    </div>
  );
} 