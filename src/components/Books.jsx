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

  const handleSearchChange = (event) =>
  {
    setSearch(event.target.value);
  };

  const addToFavorites = (book) => 
  {
    setFavorites([...favorites, book]);
  };

  const removeFromFavorites = (book) => 
  {
    const updatedFavorites = favorites.filter((favBook) => favBook.id !== book.id);
    setFavorites(updatedFavorites);
  };

  const toggleShowFavorites = () => 
  {
    setShowFavorites(!showFavorites);
  };

  const readableBook = (book) => 
  {
    return book.formats && book.formats["text/plain; charset=utf-8"];
  };

  const filteredBooks = showFavorites ? favorites : books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) && readableBook(book)
  );

  return (
    <div className="h-full bg-[#765827] justify-center pt-10">
 
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
          <div key={book.id} className="rounded shadow p-2 relative bg-[#C8AE7D]">
            <h2 className="text-3xl font-semibold mx-10 text-[#65451F]">{book.title}</h2>
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="w-full h-auto mt-2 mb-2"
            />
            <div className="flex justify-center">
              {readableBook(book) && (
                <button
                  onClick={() => window.open(book.formats["text/plain; charset=utf-8"], '_blank')} 
                  className="mt-4 px-4 text-2xl rounded-md bg-[#65451F] text-[#EAC696]  transition duration-300 ease-in-out transform hover:bg-[#EAC696] hover:text-[#65451F]"
                >
                  Read
                </button>
              )}
            </div>
            {favorites.find((favBook) => favBook.id === book.id) ? (
              <button
                onClick={() => removeFromFavorites(book)}
                className="absolute top-1 right-0 mx-4 text-white text-4xl "
              >
                ★
              </button>
            ) : (
              <button
                onClick={() => addToFavorites(book)}
                className="absolute top-1 right-0  mx-4 text-white text-4xl"
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
