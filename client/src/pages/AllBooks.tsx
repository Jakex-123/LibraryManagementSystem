//@ts-nocheck

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addBook, deleteBook, updateBook } from "@/api";
import { Plus, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "@/components/Navbar";


const AllBooks = () => {
  const token=localStorage.getItem('token')
  const headers = {
    Authorization:token,
    "Content-Type": "application/json",
  };
  const {auth}=useAuth()
  const [books, setBooks] = useState([]);
  const [updateFields, setUpdateFields] = useState({
    bookId: "",
    totalCopies: "",
    title: "",
    author: "",
  });
  const [addFields, setAddFields] = useState({
    bookId: "",
    totalCopies: "",
    title: "",
    author: "",
    availableCopies: "",
    publicationYear: "",
  });
  async function fetchData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APIURL}/api/v1/book/all`,
        { headers }
      );
      const data = response?.data?.books;
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  useEffect(() => {
    if(token) fetchData();
  }, [token]);

  const [searchQuery, setSearchQuery] = useState('');
    
  
    const filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleAdd() {
    await addBook(addFields);
    fetchData()
  }

  async function handleUpdate() {
    await updateBook(updateFields);
    fetchData()
  }
  function handleValue(book) {
    setUpdateFields({
      bookId: book?._id,
      totalCopies: book?.totalCopies,
      title: book?.title,
      author: book?.author,
    });
  }
  function handleDelete(id) {
    deleteBook(id);
  }

  return (
    <div className="w-full flex flex-col items-start relative bg-[#dfdfdf3f]">
      <Navbar type={auth?.role}/>
      <div className="w-full py-6 px-28  overflow-y-auto">
      <div className="mb-6 relative bg-[#ffffffe0] rounded-md">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search books by title or author..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
        <h1 className="text-4xl font-bold ">Manage Books</h1>
        <Table className="mt-5 bg-[#ffffffe0] rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-semibold">Image</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Author</TableHead>
              <TableHead className="text-center">Available Copies</TableHead>
              <TableHead className="text-center">Total Copies</TableHead>
              <TableHead className="text-center">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book?._id}>
                <TableCell className="flex justify-center h-[120px]">
                  <img
                    src={book?.image}
                    alt={book?.title}
                    className="w-[64px] aspect-[1.16/1] rounded"
                  />
                </TableCell>
                <TableCell className="text-center">{book?.title}</TableCell>
                <TableCell className="text-center">
                  {book?.author || "Unknown"}
                </TableCell>
                <TableCell className="text-center">
                  {book?.availableCopies}
                </TableCell>
                <TableCell className="text-center">
                  {book?.totalCopies}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-5">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => handleValue(book)}
                        >
                          Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Book</DialogTitle>
                          <DialogDescription>
                            Make changes to book here. Click save when you're
                            done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              name="title"
                              value={updateFields?.title}
                              onChange={handleUpdateChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="author" className="text-right">
                              Author
                            </Label>
                            <Input
                              id="author"
                              name="author"
                              value={updateFields?.author}
                              onChange={handleUpdateChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="total" className="text-right">
                              Total Copies
                            </Label>
                            <Input
                              id="total"
                              name="totalCopies"
                              type="number"
                              value={updateFields?.totalCopies}
                              onChange={handleUpdateChange}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogClose aschild>
                          <Button onClick={handleUpdate} type="button">
                            Update Book
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-red-600">Delete</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose>
                          <Button
                            onClick={() => handleDelete(book?._id)}
                            type="button"
                            className="bg-red-600"
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="sticky variant='outline' py-8 px-6 bottom-2.5 left-[calc(100vw-105px)]">
            <Plus className="text-4xl" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
            <DialogDescription>
              Make changes to book here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={addFields?.title}
                onChange={handleAddChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                value={addFields?.author}
                onChange={handleAddChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total" className="text-right">
                Total Copies
              </Label>
              <Input
                id="total"
                name="totalCopies"
                type="number"
                value={addFields?.totalCopies}
                onChange={handleAddChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="available" className="text-right">
                Available Copies
              </Label>
              <Input
                id="available"
                name="availableCopies"
                type="number"
                value={addFields?.availableCopies}
                onChange={handleAddChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="publicationYear" className="text-right">
                Publication Year
              </Label>
              <Input
                id="publicationYear"
                name="publicationYear"
                type="number"
                value={addFields?.publicationYear}
                onChange={handleAddChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogClose>
            <Button onClick={handleAdd} type="button">
              Add Book
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllBooks;
