import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

// User Requests

  getUserList() {
    return this.http.get('http://10.0.0.50:5555/api/get_users')
      .pipe(map(res => res.json()));
  }

  addUser(newUser) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://10.0.0.50:5555/api/add_user', newUser, { headers: headers }).pipe(map(res => res.json()));

  }

  deleteUser(username) {
    return this.http.delete('http://10.0.0.50:5555/api/delete_user/' + username).pipe(map(res => res.json()));
  }

  chgPwd(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://10.0.0.50:5555/api/chg_pwd', user, { headers: headers }).pipe(map(res => res.json()));

  }

// Domain Requests

  getDomainList() {
    return this.http.get('http://10.0.0.50:5555/api/get_domains')
      .pipe(map(res => res.json()));
  }

  addDomain(newDomain) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://10.0.0.50:5555/api/add_domain', newDomain, { headers: headers }).pipe(map(res => res.json()));
  }

  deleteDomain(domain) {
    return this.http.delete('http://10.0.0.50:5555/api/delete_domain/' + domain).pipe(map(res => res.json()));
  }

  // Group Requests

  getGroup(uid) {
    return this.http.get('http://10.0.0.50:5555/api/get_group/' + uid).pipe(map(res => res.json()));
  }

  getGroups() {
    return this.http.get('http://10.0.0.50:5555/api/get_groups').pipe(map(res => res.json()));
  }

}
