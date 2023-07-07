// components/PersonsList.tsx

import React from 'react';
import PersonListItem from './PersonListItem';

interface PersonsListProps {
  persons: {
    id: number;
    name: string;
    age: number;
    description: string;
  }[];
}

const PersonsList: React.FC<PersonsListProps> = ({ persons }) => {
  return (
    <div>
      <div className="divide-y divide-gray-200">
        {!persons.length && <div className="px-3 py-2">No persons.</div>}

        {persons?.map((person) => (
          <PersonListItem key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default PersonsList;
