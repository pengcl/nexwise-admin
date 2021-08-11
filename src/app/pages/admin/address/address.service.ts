import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddressService {

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  items(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/addresses');
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/addresses/' + id);
  }

  find(body): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/addresses', {params: body});
  }

  count(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/addresses/count');
  }

  create(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/addresses', body);
  }

  update(id, body): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/addresses/' + id, body);
  }

  delete(id): Observable<any> {
    return this.http.delete(this.PREFIX_URL + '/addresses/' + id);
  }

}
