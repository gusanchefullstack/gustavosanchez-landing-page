import { useEffect, useState } from "react";

export interface HashnodePost {
  title: string;
  url: string;
  brief: string;
  publishedAt: string;
}

interface HashnodeState {
  posts: HashnodePost[];
  loading: boolean;
  error: string | null;
}

const QUERY = `
  query GetMyPosts {
    me {
      publications(first: 1) {
        edges {
          node {
            posts(first: 30) {
              edges {
                node {
                  title
                  url
                  brief
                  publishedAt
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function useHashnodePosts(): HashnodeState {
  const [state, setState] = useState<HashnodeState>({
    posts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = import.meta.env.VITE_HASHNODE_TOKEN as string | undefined;
    if (!token) {
      setState({ posts: [], loading: false, error: "Hashnode token not configured." });
      return;
    }

    fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((res) => res.json())
      .then((data: { data?: { me?: { publications?: { edges?: { node?: { posts?: { edges?: { node: HashnodePost }[] } } }[] } } } }) => {
        const edges =
          data?.data?.me?.publications?.edges?.[0]?.node?.posts?.edges ?? [];
        const posts: HashnodePost[] = edges.map((e) => e.node);
        setState({ posts, loading: false, error: null });
      })
      .catch((err: Error) => {
        setState({ posts: [], loading: false, error: err.message });
      });
  }, []);

  return state;
}
