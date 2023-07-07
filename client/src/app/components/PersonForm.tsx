import React, { useEffect } from 'react';
import Person from '@/app/models/Person';
import { useForm } from 'react-hook-form';
import Error from './InputErrorMessage';

interface PersonFormProps {
  person?: Person,
  onSubmit: (person: Person) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({ person, onSubmit }) => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();

  const customHandleSubmit = (data: object) => {
    onSubmit(data as Person);
    resetForm();
  };

  const setInputClass = (inputName: string) => {
    return `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ${
      errors[inputName] ? 'border-red-500 focus:ring-red-600 focus:border-red-600' : 'focus:ring-gray-500 focus:border-gray-500'
    }`;
  };

  const setInitialValues = () => {
    if (person) {
      setValue('name', person.name);
      setValue('age', person.age);
      setValue('description', person.description);
    }
  };

  const resetForm = () => {
    // You can reset form fields if needed
  };

  useEffect(() => {
    setInitialValues();
  }, [person]);

  return (
    <form onSubmit={handleSubmit(customHandleSubmit)} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name Required' })}
          className={setInputClass('name')}
        />
        {errors.name && <Error message={errors.name.message as string} />}
      </div>

      <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700 font-bold mb-1">
          Age
        </label>
        <input
          type="number"
          id="age"
          {...register('age', { required: 'Age Required' })}
          className={setInputClass('age')}
        />
        {errors.age && <Error message={errors.age.message as string} />}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { required: 'Description Required' })}
          className={setInputClass('description')}
        ></textarea>
        {errors.description && <Error message={errors.description.message as string} />}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default PersonForm;
