//@ts-nocheck
import { Book, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = ({type}) => {

  return (
    <nav className="border-b w-full bg-[#ffffffe0]">
      <div className="mx-auto px-28">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">{type==='admin'?'Library Dashboard':'Library'}</h1>

          <div className="hidden md:flex items-center gap-6">
            {type=='admin' && <a
              href="/booksall"
              className="flex items-center text-sm font-medium hover:text-primary"
            >
              <Book className="mr-2 h-4 w-4" />
              All Books
            </a>}
            <a
              href="/books"
              className="flex items-center text-sm font-medium hover:text-primary"
            >
              <Book className="mr-2 h-4 w-4" />
              Available Books
            </a>
            {type=='admin' && <a
              href="/borrowed"
              className="flex items-center text-sm font-medium hover:text-primary"
            >
              <Users className="mr-2 h-4 w-4" />
              Borrowed Books Users
            </a>}
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-4">
                <a
                  href="/booksall"
                  className="flex items-center text-sm font-medium hover:text-primary"
                >
                  <Book className="mr-2 h-4 w-4" />
                  All Books
                </a>
                <a
              href="/books"
              className="flex items-center text-sm font-medium hover:text-primary"
            >
              <Book className="mr-2 h-4 w-4" />
              Available Books
            </a>
                <a
                  href="/borrowed"
                  className="flex items-center text-sm font-medium hover:text-primary"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Borrowed Books Users
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;