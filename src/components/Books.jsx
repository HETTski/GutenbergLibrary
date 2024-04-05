import React, { useState, useEffect } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full  px-10 bg-[#ccffcc] justify-center ">
      <h1 className="text-3xl font-bold mb-4">Books:</h1>
      <input
        type="text"
        placeholder="Search Books..."
        value={search}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 rounded-md mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">{book.title}</h2>

            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="w-full h-auto mb-2"
            />
            <p className="text-blue-500">
              <a href={book.formats["text/plain; charset=utf-8"]}>Read</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
