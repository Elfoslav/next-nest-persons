import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Person from '@/app/models/Person';
import PersonDetail from '@/app/components/PersonDetail';

const PersonDetailPage = () => {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const queryClient = useQueryClient();
  const [person, setPerson] = useState<Person | null>(null);

  // Simulating fetching data from an API
  useEffect(() => {
    // Assuming you have an API endpoint to fetch person data
    const fetchPerson = async () => {
      const persons: Person[] | undefined = queryClient.getQueryData<Person[]>('persons');
      const person = persons?.find((p) => p.id === Number(id));
      setPerson(person || null);
    };

    // Call the fetchPerson function when the ID changes
    if (id) {
      fetchPerson();
    }
  }, [id, queryClient]);

  return (
    <div className="mt-4">
      {person ? (
        <PersonDetail person={person} />
      ) : (
        <div className="text-center">Person not found.</div>
      )}
    </div>
  );
};

export default PersonDetailPage;
