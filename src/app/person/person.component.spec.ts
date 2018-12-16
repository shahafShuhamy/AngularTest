import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { PersonService } from './person.service';
import { JobService } from '../JobService.service';
import { SpyService } from './spyService.service';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let valueServiceSpy: jasmine.SpyObj<SpyService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('SpyService', ['getSpyMethod']);
    TestBed.configureTestingModule({
      declarations: [ PersonComponent ],
      providers: [  PersonService, JobService , {provide: SpyService, useValue: spy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(PersonComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get a person from the service', () => {
    const personService = TestBed.get(PersonService);
    const person = personService.getPerson();
    expect(person.name).toBe('Shahaf');
  });

  it('should get an alabotrate person', () => {
    const alaboratePerson  = TestBed.get(PersonService);
    const person = alaboratePerson.getAlaboratePerson();
    expect(person.job).toBe('programmer');
  });

  it('should get an sneaky sneaky person', () => {
    // init services
    const person  = TestBed.get(PersonService);
    valueServiceSpy = TestBed.get(SpyService);

    // set return value for spy object
    const spyValueRet = 'sneaky sneaky...';
    valueServiceSpy.getSpyMethod.and.returnValue(spyValueRet);

    // call method from required service +  expect result
    const personObj = person.getSneakyName();
    expect(personObj.name).toContain('sneaky sneaky...');

    // expect that method been called once
    expect(valueServiceSpy.getSpyMethod.calls.count())
    .toBe(1, 'spy method was called once');
  });
});
