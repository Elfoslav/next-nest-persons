import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { API } from '@/app/lib/consts';
import apiClient from '@/app/lib/apiClient';
import PersonForm from '@/app/components/PersonForm';
import Person from '@/app/models/Person';

const PersonAddPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createPerson = async (data: Person): Promise<Person> => {
    try {
      const response = await apiClient.post(API.PERSONS.CREATE, data);
      return response.data as Person;
    } catch (error) {
      throw new Error('Error creating person');
    }
  };

  const mutation = useMutation<Person, Error, Person>(createPerson, {
    onSuccess: async (data) => {
      const { id } = data;
      await queryClient.invalidateQueries('persons');
      router.push(`/persons/${id}`);
    },
    onError: (error) => {
      console.error(error);
      alert(error.message);
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
