import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateDto } from 'src/app/models/user/userCreateDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = "http://localhost:3200/users"

  constructor(private http: HttpClient) { }

  saveUser(user: UserCreateDto) {
    return this.http.post(`${this.userUrl}/post`, user, { responseType: "text" });
  }
}
