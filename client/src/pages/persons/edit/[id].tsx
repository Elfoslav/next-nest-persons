import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { API } from '@/app/lib/consts';
import Person from '@/app/models/Person';
import PersonForm from '@/app/components/PersonForm';

const PersonEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
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

  const updatePerson = async (data: Person) => {
    const response = await fetch(API.PERSONS.PATCH, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error creating person');
    }

    return response.json();
  };

  const mutation = useMutation<Person, Error, Person>(updatePerson, {
    onSuccess: async (data) => {
      const { id } = data;
      await queryClient.invalidateQueries('persons');
      router.push(`/persons/${id}`);
    },
    onError: (error) => {
      console.error(error);
      alert(error);
    },
  });

  const onSubmit = (data: Person) => {
    mutation.mutate(data);
  }

  return (
    <div className="mt-4">
      {person ? (
        <PersonForm person={person} onSubmit={onSubmit} />
      ) : (
        <p>Person not found</p>
      )}
    </div>
  );
};

export default PersonEditPage;
