//@ts-nocheck

export async function getBookDetails(author, title) {
  try {
    const query = `intitle:${title}+inauthor:${author}`;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${process.env.BOOKS_API}`);

    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        const imageUrl = book.imageLinks ? book.imageLinks.thumbnail : 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif';
        const description = book.description || "Description not available";
        const genre = book.categories ? book.categories.join(", ") : "Genre not available"; // Join genres if multiple
        const pages = book.pageCount || "Page count not available"; // Default if no page count

        return { imageUrl, description, genre, pages };
      } else {
        console.log('No book found');
        return null;
      }
    } else {
      console.log('Error fetching data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
}
