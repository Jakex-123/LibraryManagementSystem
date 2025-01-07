//@ts-nocheck

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import { useAuth } from '../../context/AuthContext';


const AvailableBooks = () => {
  const token=localStorage.getItem('token')

const headers = {
  Authorization:token,
  'Content-Type': 'application/json',
};
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APIURL}/api/v1/book/available`, { headers });
        const data = response?.data?.books;
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
    fetchData();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  const [searchQuery, setSearchQuery] = useState('');
  

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const {auth}=useAuth()

  return (
    <div className="w-full">
      <Navbar type={auth?.role}/>
      <div className="mb-6 max-w-7xl mx-auto relative bg-[#ffffffe0] rounded-md mt-5">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search books by title or author..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        
        {filteredBooks.map(book => (
          <Card key={book._id} onClick={()=>handleBookClick(book._id)} className="cursor-pointer flex flex-col">
            <CardHeader className="p-4">
              <div className={`w-full h-48 rounded-lg flex items-center justify-center`}>
                <img src={book.image} alt="" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm">{book.author}</p>
            </CardContent>
            <CardFooter className="p-4">
              <span className={`px-2 py-1 rounded-full text-sm ${
                book.availableCopies>0  ? 'bg-green-100 text-green-800' :
                book.availableCopies==0  ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {book.availableCopies>0?'Available':'Checked Out'}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredBooks.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No books found matching your search.
        </div>
      )}
    </div>
  );
};

export default AvailableBooks;
