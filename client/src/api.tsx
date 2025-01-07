///@ts-nocheck

import axios from "axios";
import { showToast } from '../utils/utils';
const token = localStorage.getItem('token');
const headers = {
  Authorization: token,
  "Content-Type": "application/json",
};

export const updateBook = async ({
  bookId,
  title,
  author,
  totalCopies,
}: {
  bookId: string;
  totalCopies: string;
  title: string;
  author: string;
}) => {
  const updatedBookData = {
    title,
    author,
    totalCopies,
  };

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APIURL}/api/v1/book/${bookId}`,
      updatedBookData,
      { headers }
    );
    showToast(response.data.message, 'success');
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : "Error updating book";
    console.error("Error updating book:", errorMessage);
    showToast(errorMessage, 'error');
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APIURL}/api/v1/book/${bookId}`, 
      { headers }
    );
    showToast(response.data.message, 'success');
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : "Error deleting book";
    console.error("Error deleting book:", errorMessage);
    showToast(errorMessage, 'error');
  }
};

export const addBook = async ({
  title,
  author,
  publicationYear,
  totalCopies,
  availableCopies,
}: {
  title: string;
  author: string;
  publicationYear: number;
  totalCopies: number;
  availableCopies: number;
}) => {
  const newBookData = {
    title,
    author,
    publicationYear,
    totalCopies,
    availableCopies,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APIURL}/api/v1/book`,
      newBookData,
      { headers }
    );
    console.log("Book added successfully:", response.data);
    showToast(response.data.message, 'success');
    return response.data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : "Error adding book";
    console.error("Error adding book:", errorMessage);
    showToast(errorMessage, 'error');
    throw error;
  }
};

export async function fetchUserWithBooks(setUsers) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APIURL}/api/v1/user/borrowed`,
      { headers }
    );
    const data = await response?.data?.users;
    setUsers(data);
    console.log(data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : "Error fetching user data";
    console.error("Error fetching book data:", error);
  }
}

export async function returnBook(bookId, userId) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APIURL}/api/v1/transaction/return`,
      {
        bookId: bookId,
        userId: userId,
      },
      { headers }
    );

    if (response.data.success) {
      console.log("Book returned successfully:", response.data.transaction);
      showToast("Book returned successfully", 'success');
    } else {
      console.log("Error:", response.data.message);
      showToast(response.data.message, 'error');
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : "Error during book return";
    console.error("Error during book return:", errorMessage);
    showToast(errorMessage, 'error');
  }
}
