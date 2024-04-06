import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetch("https://gutendex.com/books/")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.results);
      })
      .catch((error) => {
        console.error("Error during fetching data", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const addToFavorites = (book) => {
    setFavorites([...favorites, book]);
  };

  const removeFromFavorites = (book) => {
    const updatedFavorites = favorites.filter((favBook) => favBook.id !== book.id);
    setFavorites(updatedFavorites);
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const canReadBook = (book) => {
    return book.formats && book.formats["text/plain; charset=utf-8"];
  };

  const filteredBooks = showFavorites ? favorites : books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) && canReadBook(book)
  );

  return (
    <div className="h-full  bg-[#765827] justify-center pt-10">
 
      <div className="flex mb-4 px-10">
        <input
          type="text"
          placeholder="Search Books..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-md mr-2"
        />
        <button onClick={toggleShowFavorites} className="px-4 py-2 rounded-md bg-blue-500 text-white">
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div >
      <div className="grid px-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded shadow p-4 relative bg-[#C8AE7D]">
            <h2 className="text-lg font-semibold mx-4 ">{book.title}</h2>
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="w-full h-auto mb-2"
            />
            <div className="flex justify-center">
              {canReadBook(book) && (
                <button
                  onClick={() => window.open(book.formats["text/plain; charset=utf-8"], '_blank')} 
                  className="px-4 py-2 rounded-md bg-blue-400 text-white"
                >
                  Read
                </button>
              )}
            </div>
            {favorites.find((favBook) => favBook.id === book.id) ? (
              <button
                onClick={() => removeFromFavorites(book)}
                className="absolute top-0 right-0 mx-4 text-yellow-500 text-4xl "
              >
                ★
              </button>
            ) : (
              <button
                onClick={() => addToFavorites(book)}
                className="absolute top-0 right-0  mx-4 text-gray-400 text-4xl"
              >
                ☆
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
