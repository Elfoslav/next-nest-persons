import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, UseQueryResult } from 'react-query';
import { API } from '@/app/lib/consts';
import apiClient from '@/app/lib/apiClient';
import PersonsList from '@/app/components/PersonsList';
import Button from './Button';
import './Layout.scss';
import { PlusSmallIcon } from '@heroicons/react/24/solid';
import Person from '../models/Person';
import SearchForm from './SearchForm';

const fetchPersons = async (): Promise<Person[]> => {
  try {
    const response = await apiClient.get(API.PERSONS.GET_ALL);
    return response.data as Person[];
  } catch (error) {
    throw error;
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    isLoading,
    data,
    error,
  }: UseQueryResult<Person[], Error> = useQuery('persons', fetchPersons);

  const [filteredPersons, setFilteredPersons] = useState<Person[]>(data || [])

  const handleSearch = (searchText: string) => {
    const filteredData = data?.filter((person: Person) =>
      person.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredPersons(filteredData || []);
  };

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error]);

  useEffect(() => {
    setFilteredPersons(data || []);
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="mb-4">Loading...</div>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mb-4 mx-4">
      <div id="header" className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">
          <Link href={`/`}>List of persons</Link>
        </h1>
        <Button href="/persons/add" icon={PlusSmallIcon} rounded color="green"  className="mr-17"/>
      </div>
      <div id="content" className="max-w-4xl mx-auto mt-4 border box-border">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 border-r-2 min-h-[90vh]">
            {/* Sidebar content */}
            <SearchForm onSubmit={handleSearch}/>
            <PersonsList persons={filteredPersons} />
          </div>

          {/* Main content */}
          <div className="w-3/4 mx-4 mt-2 mb-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
