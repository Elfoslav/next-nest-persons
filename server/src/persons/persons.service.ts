import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private personsRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = this.personsRepository.create(createPersonDto);
    return this.personsRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return this.personsRepository.find();
  }

  async findOne(id: number): Promise<Person | null> {
    return this.personsRepository.findOneBy({ id });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person | null> {
    const person = await this.findOne(id);
    if (person) {
      const updatedPerson = Object.assign(person, updatePersonDto);
      return this.personsRepository.save(updatedPerson);
    }
    return null;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.personsRepository.delete(id);
    return result.affected > 0;
  }
}
