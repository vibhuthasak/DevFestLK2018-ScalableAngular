import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { Employee } from '../model/employee.model';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
  });
  beforeEach(() => {
    service = TestBed.get(EmployeeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', async(() => {
    const dummy: Employee[] = [
      { id: 1, firstname: 'Sharfraz', lastname: 'Rahim', email: 'Sharfraz.Rahim@dialog.lk' },
      { id: 2, firstname: 'Keshan', lastname: 'Sodimana', email: 'Keshan.Sodimana@google.lk' }
    ];

    service.getEmployees().subscribe(list => {
      expect(list.length).toBe(2);
      expect(list).toEqual(dummy);
    });

    const request = httpMock.expectOne(`${environment.apiBaseUrl}/employees`);
    expect(request.request.method).toBe('GET');

    request.flush(dummy);
  }));

  it('should test fakeAsync', fakeAsync(() => {
    let flag = false;
    setTimeout(() => {
      flag = true;
    }, 50);
    expect(flag).toBe(false);
    tick(50);
    expect(flag).toBe(true);
  }));
});