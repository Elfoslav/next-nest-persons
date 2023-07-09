// components/Person.tsx

import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Person from '@/app/models/Person';
import { SidebarContext } from './SidebarContext';

const PersonListItem: React.FC<{ person: Person}> = ({ person }) => {
  const router = useRouter();
  const { setSidebarOpen } = useContext(SidebarContext);
  const personDetailLink = `/persons/${person.id}`;
  const isActive = router.asPath === personDetailLink;
  const linkClassName = `block px-4 py-2 ${
    isActive ? 'text-white bg-green-500' : 'text-gray-800 hover:bg-gray-100'
  }`;

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      <Link href={personDetailLink} className={linkClassName} onClick={closeSidebar}>
        {person.name}
      </Link>
    </div>
  );
};

export default PersonListItem;
