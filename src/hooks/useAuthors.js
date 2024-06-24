import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/authors";

// Custom hook for fetching authors with refetch capability
export const useFetchAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setAuthors(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return { authors, loading, error, refetch: fetchAuthors };
};

// Custom hook for adding a new author
export const useAddAuthor = () => {
  const [error, setError] = useState(null);

  const addAuthor = async (author) => {
    try {
      await axios.post(API_URL, author);
    } catch (err) {
      setError(err);
    }
  };

  return { addAuthor, error };
};

// Custom hook for deleting an author
export const useDeleteAuthor = () => {
  const [error, setError] = useState(null);

  const deleteAuthor = async (authorId) => {
    try {
      await axios.delete(`${API_URL}/${authorId}`);
    } catch (err) {
      setError(err);
    }
  };

  return { deleteAuthor, error };
};

// Custom hook for updating an author
export const useUpdateAuthor = () => {
  const [error, setError] = useState(null);

  const updateAuthor = async (authorId, author) => {
    try {
      await axios.put(`${API_URL}/${authorId}`, author);
    } catch (err) {
      setError(err);
    }
  };

  return { updateAuthor, error };
};
