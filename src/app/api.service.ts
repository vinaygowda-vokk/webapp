import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getSmartphone() {
    return this.http.get('http://localhost:3000/user');
  }

  getDetailOnPinCode(pincode: string): Observable<Array<any>> {
    //http://www.postalpincode.in/api/pincode/571430
    return this.http.get<Array<any>>(
      `https://thezipcodes.com/get-zip-data?zipCode=${pincode}&countryCode=IN`
      // {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods':
      //       'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      //     'Access-Control-Allow-Headers':
      //       'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent',
      //   },
      // }
    );
  }

  registerUserData(data: object) {
    //http://www.postalpincode.in/api/pincode/571430
    return this.http.post(`http://localhost:3000/user`, data, {
      headers: { 'content-type': 'application/json' },
    });
  }
}
