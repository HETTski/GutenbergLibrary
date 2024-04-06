import React, { useState, useEffect } from "react";

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

  const filteredBooks = showFavorites ? favorites : books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full  px-10 bg-[#ccffcc] justify-center ">
      <h1 className="text-3xl font-bold mb-4">Books:</h1>
      <div className="flex mb-4">
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded shadow p-4 relative">
            <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="w-full h-auto mb-2"
            />
            <div className="flex justify-center">
            <p className="text-blue-500 mb-2">
              <button className="px-4 py-2 rounded-md bg-blue-400 text-white ">
                <a href={book.formats["text/plain; charset=utf-8"]}>Read</a>
              </button>
            </p>
            </div>    
            {favorites.find((favBook) => favBook.id === book.id) ? (
              <button
                onClick={() => removeFromFavorites(book)}
                className="absolute top-0 right-0 mt-2 mr-2 text-yellow-500"
              >
                ★
              </button>
            ) : (
              <button
                onClick={() => addToFavorites(book)}
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-400"
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
