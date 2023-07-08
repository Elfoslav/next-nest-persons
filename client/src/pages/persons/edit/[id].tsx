import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { API } from '@/app/lib/consts';
import apiClient from '@/app/lib/apiClient';
import Person from '@/app/models/Person';
import PersonForm from '@/app/components/PersonForm';

const PersonEditPage = () => {
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

  const updatePerson = async (data: Person): Promise<Person> => {
    try {
      const apiUrl = API.PERSONS.PATCH.replace(':id', id || '');
      const response = await apiClient.patch(apiUrl, data);
      return response.data as Person;
    } catch (error) {
      throw new Error('Error updating person');
    }
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
    <div className="mt-2">
      {person ? (
        <PersonForm person={person} onSubmit={onSubmit} />
      ) : (
        <p>Person not found</p>
      )}
    </div>
  );
};

export default PersonEditPage;
