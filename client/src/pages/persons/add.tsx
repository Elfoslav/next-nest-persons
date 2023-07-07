import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { API } from '@/app/lib/consts';
import PersonForm from '@/app/components/PersonForm';
import Person from '@/app/models/Person';

const PersonAddPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createPerson = async (data: Person) => {
    const response = await fetch(API.PERSONS.CREATE, {
      method: 'POST',
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

  const mutation = useMutation<Person, Error, Person>(createPerson, {
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
      <PersonForm onSubmit={onSubmit} />
    </div>
  );
};

export default PersonAddPage;
