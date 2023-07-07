// components/Person.tsx

import React from 'react';
import Link from 'next/link';
import Person from '@/app/models/Person';

const PersonListItem: React.FC<{ person: Person}> = ({ person }) => {
  return (
    <div className="px-3 py-1">
      <Link href={`/persons/${person.id}`} className="text-xl font-semibold mb-2 hover:underline">
        {person.name}
      </Link>
    </div>
  );
};

export default PersonListItem;
