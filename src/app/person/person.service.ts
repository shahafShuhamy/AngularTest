import { Injectable } from '@angular/core';
import { JobService } from '../JobService.service';
import { AlaboratePerson } from './alaboratePerson';
import { SpyService } from './spyService.service';

@Injectable()
export class PersonService {
  constructor(private jobService: JobService,
              private spyService: SpyService) {}
  getPerson() {
    return {
      name: 'Shahaf',
      age: '29'
    };
  }

  getAlaboratePerson() {
    const person = this.getPerson();
    const personsjob = this.jobService.getHelperMethod();
    const newPerson: AlaboratePerson = {...person, ...personsjob};
    return newPerson;
  }

  getSneakyName() {
    const person = this.getPerson();
    person.name += this.spyService.getSpyMethod();
    return person;
  }
}
