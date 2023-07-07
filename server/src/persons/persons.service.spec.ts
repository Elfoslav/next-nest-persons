import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from './persons.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonsModule } from './persons.module';

describe('PersonsService', () => {
  let service: PersonsService;
  let repository: Repository<Person>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonsService, {
        provide: getRepositoryToken(Person),
        useClass: Repository,
      }],
    }).compile();

    service = module.get<PersonsService>(PersonsService);
    repository = module.get<Repository<Person>>(getRepositoryToken(Person));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new person', async () => {
      // Arrange
      const createPersonDto: CreatePersonDto = {
        name: 'John Doe',
        age: 25,
        description: 'Test person',
      };
      const createdPerson: Person = {
        id: 1,
        name: 'John Doe',
        age: 25,
        description: 'Test person',
      };

      // Mock the repository methods
      jest.spyOn(repository, 'create').mockReturnValue(createdPerson);
      jest.spyOn(repository, 'save').mockResolvedValue(createdPerson);


      // Act
      const result = await service.create(createPersonDto);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(createPersonDto);
      expect(repository.save).toHaveBeenCalledWith(createdPerson);
      expect(result).toEqual(createdPerson);
    });
  });

  describe('findAll', () => {
    it('should return an array of persons', async () => {
      // Arrange
      const persons: Person[] = [
        { id: 1, name: 'John Doe', age: 25, description: 'Test person' },
        { id: 2, name: 'Jane Smith', age: 30, description: 'Another person' },
      ];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(persons);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(persons);
      expect(findSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a person by ID', async () => {
      // Arrange
      const personId = 1;
      const person: Person = { id: personId, name: 'John Doe', age: 25, description: 'Test person' };

      const findOneSpy = jest.spyOn(repository, 'findOneBy').mockResolvedValue(person);

      // Act
      const result = await service.findOne(personId);

      // Assert
      expect(result).toEqual(person);
      expect(findOneSpy).toHaveBeenCalledWith({ id: personId });
    });

    it('should return null when person is not found', async () => {
      // Arrange
      const personId = 1;

      const findOneSpy = jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      // Act
      const result = await service.findOne(personId);

      // Assert
      expect(result).toBeNull();
      expect(findOneSpy).toHaveBeenCalledWith({ id: personId });
    });
  });

  describe('update', () => {
    it('should update a person by ID', async () => {
      // Arrange
      const personId = 1;
      const updatePersonDto: UpdatePersonDto = {
        name: 'Updated Name',
        age: 30,
        description: 'Updated description',
      };

      const person: Person = { id: personId, name: 'John Doe', age: 25, description: 'Test person' };
      const findOneSpy = jest.spyOn(repository, 'findOneBy').mockResolvedValue(person);
      const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue({ ...person, ...updatePersonDto } as Person);

      // Act
      const result = await service.update(personId, updatePersonDto);

      // Assert
      expect(result).toEqual({ ...person, ...updatePersonDto });
      expect(findOneSpy).toHaveBeenCalledWith({ id: personId });
      expect(saveSpy).toHaveBeenCalledWith({ ...person, ...updatePersonDto });
    });

    it('should return null when person is not found for update', async () => {
      // Arrange
      const personId = 1;
      const updatePersonDto: UpdatePersonDto = {
        name: 'Updated Name',
        age: 30,
        description: 'Updated description',
      };

      const findOneSpy = jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      // Act
      const result = await service.update(personId, updatePersonDto);

      // Assert
      expect(result).toBeNull();
      expect(findOneSpy).toHaveBeenCalledWith({ id: personId });
    });
  });

  describe('remove', () => {
    it('should remove a person by ID', async () => {
      // Arrange
      const personId = 1;
      const deleteResult = { affected: 1 };
      const deleteSpy = jest.spyOn(repository, 'delete').mockResolvedValue(Promise.resolve(deleteResult) as any);

      // Act
      const result = await service.remove(personId);

      // Assert
      expect(result).toBe(true);
      expect(deleteSpy).toHaveBeenCalledWith(personId);
    });

    it('should return false when person is not found for removal', async () => {
      // Arrange
      const personId = 1;
      const deleteResult = { affected: 0 };
      const deleteSpy = jest.spyOn(repository, 'delete').mockResolvedValue(Promise.resolve(deleteResult) as any);

      // Act
      const result = await service.remove(personId);

      // Assert
      expect(result).toBe(false);
      expect(deleteSpy).toHaveBeenCalledWith(personId);
    });
  });
});
