// components/Person.tsx

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Person from '@/app/models/Person';

const PersonListItem: React.FC<{ person: Person}> = ({ person }) => {
  const router = useRouter();
  const personDetailLink = `/persons/${person.id}`;
  const isActive = router.asPath === personDetailLink;
  const linkClassName = `block px-4 py-2 ${
    isActive ? 'text-white bg-green-500' : 'text-gray-800 hover:bg-gray-100'
  }`;

  return (
    <div>
      <Link href={personDetailLink} className={linkClassName}>
        {person.name}
      </Link>
    </div>
  );
};

export default PersonListItem;
