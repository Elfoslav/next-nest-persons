import React from 'react';
import { useRouter } from 'next/router';
import { PencilIcon } from '@heroicons/react/24/solid';
import Person from '@/app/models/Person';
import Button from './Button';

const PersonDetail: React.FC<{ person: Person}> = ({ person }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/persons/edit/${person?.id}`);
  }

  return (
    <div className="text-center relative">
      <h1 className="text-xl font-semibold mb-2">
        {person.name}
        <Button className="absolute top-0 right-0" rounded icon={PencilIcon} onClick={handleEditClick} color="yellow" />
      </h1>
      <p className="text-gray-500">Age: {person.age}</p>
      <p className="text-gray-500">{person.description}</p>
    </div>
  );
};

export default PersonDetail;
