import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestApiComponent } from './rest-api.component';
import { HttpService } from '../httpService.service';
import { Todo } from './../todo.model';
import { Observable , defer} from 'rxjs';

describe('RestApiComponent', () => {
  let component: RestApiComponent;
  let httpClientSpy: { get: jasmine.Spy };
  let httpService: HttpService;
  let fixture: ComponentFixture<RestApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    fixture = TestBed.createComponent(RestApiComponent);
    httpService = new HttpService(<any> httpClientSpy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return expected todo (HttpClient called once)', () => {
    const result = {
      'userId': 1,
      'id': 1,
      'title': 'title 1',
      'completed': false
    };
    httpClientSpy.get.and.returnValue(asyncData(result));
    httpService.getSomePage().subscribe(todo => {
      expect(todo.id).toBe(1);
      expect(todo).toBeTruthy();
    });
  });

  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});
