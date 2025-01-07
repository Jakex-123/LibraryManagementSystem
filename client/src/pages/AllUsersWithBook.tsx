//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchUserWithBooks, returnBook } from '@/api';
import Navbar from '@/components/Navbar';
import { useAuth } from '../../context/AuthContext';

const AllUsersWithBook = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetchUserWithBooks(setUsers)
  },[])
 
  const handleReturnBook = async (bookId, userId) => {
    await returnBook(userId,bookId)
     fetchUserWithBooks(setUsers)
    setUsers(users?.map(user => {
      if (user._id === userId) {
        return {
          ...user,
          books: user?.books?.filter(book => book._id !== bookId)
        };
      }
      return user;
    }));
  };

  const filteredUsers = users?.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user?.name.toLowerCase().includes(searchLower) ||
      user?.email.toLowerCase().includes(searchLower) ||
      user?.books.some(book => 
        book.title.toLowerCase().includes(searchLower)
      )
    );
  });
  const {auth}=useAuth()

  return (
    <div className="w-full">
    <Navbar type={auth?.role} />
      <div className="relative bg-[#ffffffe0] rounded-md  max-w-4xl mx-auto mt-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search by name, email, or book title..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border bg-[#ffffffe0]  max-w-4xl mx-auto mt-4" >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">User Information</TableHead>
              <TableHead>Books Checked Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.books.length > 0 ? (
                      <div className="space-y-2">
                        {user.books.map(book => (
                          <div key={book._id} className="flex items-center justify-between">
                            <div>
                              <span>{book.title}</span>
                            </div>
                            <Button 
                              onClick={() => handleReturnBook(user._id, book._id)}
                              size="sm"
                              variant="outline"
                            >
                              Return
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">No books checked out</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-gray-500">
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllUsersWithBook;