import React, { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import apiClient from '@/app/lib/apiClient';
import Person from '@/app/models/Person';
import Button from './Button';
import Modal from './Modal';
import { API } from '@/app/lib/consts';
import './PersonDetail.scss';

const PersonDetail: React.FC<{ person: Person}> = ({ person }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onEditClick = () => {
    router.push(`/persons/edit/${person?.id}`);
  }

  const onOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  }

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  const deletePerson = async (): Promise<Boolean> => {
    try {
      const apiUrl = `${API.PERSONS}/${person.id}`;
      const response = await apiClient.delete(apiUrl);
      return response.data as boolean;
    } catch (error) {
      throw new Error('Error updating person');
    }
  };

  const mutation = useMutation<Boolean, Error, Person>(deletePerson, {
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries('persons');
      router.push('/');
    },
    onError: (error): void => {
      console.error(error);
      alert(error);
    },
  });

  const onSubmitDelete = async () => {
    mutation.mutate(person);
    onCloseDeleteModal();
  }

  return (
    <>
      <div className="text-center relative person-detail-content">
        <Button className="absolute top-0 right-0" rounded icon={PencilIcon} onClick={onEditClick} color="yellow" />
        <Button className="absolute top-12 right-0" rounded icon={TrashIcon} onClick={onOpenDeleteModal} color="red" />
        <h1 className="text-xl font-semibold mb-2">
          {person.name}
        </h1>
        <p className="text-gray-500">Age: {person.age}</p>
        <p className="text-gray-500">{person.description}</p>
      </div>

      <Modal
        title="Delete"
        text="Do you really want to delete this person?"
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        onSubmit={onSubmitDelete}
      />
    </>
  );
};

export default PersonDetail;
