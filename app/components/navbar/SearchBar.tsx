// SearchBar.js
import React from 'react';

const SearchBar = () => {
    // Add your search bar functionality here
    return (
        <div className="flex items-center">

            <input
                type="text"
                placeholder="Keresés..."
                className="border rounded-md p-2 focus:outline-none focus:ring focus:border-lime-700"
            />

        </div>
    );
};

export default SearchBar;
