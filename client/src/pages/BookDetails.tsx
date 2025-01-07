//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Badge,
} from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import axios from 'axios';
import { showToast } from '../../utils/utils';
import Navbar from '@/components/Navbar';
import { useAuth } from '../../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const headers = {
    Authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
  };
  const {auth}=useAuth()

  useEffect(() => {
    async function fetchBookData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APIURL}/api/v1/book/${id}`, { headers });
        const data = await response?.data?.book;
        setBook(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    }
    if (id) {
      fetchBookData();
    }
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  async function borrowBook() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APIURL}/api/v1/transaction/borrow`, 
        { bookId: id }, 
        { headers }
      );
      showToast(response.data.message,'success')
    } catch (error) {
      console.error("Error borrowing book:", error);
      showToast(error.message,error)
    }
  }

  return (
    <div className="container">
      <Navbar type={auth?.role} />
      <Card className="max-w-7xl mx-auto p-6 mt-5">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6" />
            <Badge variant="secondary">{book.genre}</Badge>
          </div>
          <CardTitle className="text-3xl mt-2">{book.title}</CardTitle>
          <CardDescription className="text-lg">
            By {book.author} • {book.publishedYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <img
                      src={book.image}
                      alt={`${book.title} cover`}
                      className="rounded-lg shadow-md w-72 h-96 object-cover"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to view larger image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pages</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={book?.availableCopies>0 ? "success" : "destructive"}>
                    {book?.availableCopies>0 ? "Available" : "Checked Out"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About this book</h3>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>
                </ScrollArea>
              </div>

              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={()=>borrowBook()}
                  variant={book.availableCopies>0 ? "default" : "secondary"}
                  disabled={!book.availableCopies>0}
                >
                  {book.availableCopies>0 ? (
                    <>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Borrow Now
                    </>
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookDetails;

