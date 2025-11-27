import { useState, useEffect } from 'react';
import { WordPressRestClient } from './client';

export const useRestPosts = (
  client: WordPressRestClient,
  params = {}
) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await client.getPosts(params);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [client, JSON.stringify(params)]);

  return { posts, loading, error };
};
