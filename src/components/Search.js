import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                    <i className="search-icon">🔍</i>
                </button>
            </form>
        </div>
    );
};

export default Search;