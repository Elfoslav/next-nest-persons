import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchFormProps {
  onSubmit: (text: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {

  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('search submit', searchText);
    if (onSubmit) {
      onSubmit(searchText);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      <div className="relative w-full">
      <input
        type="search"
        className="block p-2.5 w-full rounded-tl text-sm text-gray-900 border-l-gray-50 border-l-2 border border-gray-300 outline-none"
        placeholder="Search..."
        value={searchText}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-green-500 border border-green-500 hover:bg-green-600"
      >
        <MagnifyingGlassIcon className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">Search</span>
      </button>
    </div>
    </form>
  );
};

export default SearchForm;
