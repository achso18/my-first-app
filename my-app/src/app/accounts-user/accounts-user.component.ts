import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { Domain } from '../domain';
import { DataService } from '../data.service';

@Component({
  selector: 'app-accounts-user',
  templateUrl: './accounts-user.component.html',
  styleUrls: ['./accounts-user.component.css'],
  providers: [DataService,

  ],
})
export class AccountsUserComponent implements OnInit {

  userList: User[] = [];
  selectedUser: User;
  toogleForm: boolean = false;

  @Input('domainList') domains: Domain[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dataService.getUserList().subscribe(users => {
      this.userList = users;
      //console.log('data from dataservice: ' + this.userList);
    });
  }

  addUser(form) {
    let newUser: User = {
      username: form.value.username,
      domain: form.value.domain,
      password: form.value.password
    }
    this.dataService.addUser(newUser).subscribe(user => {
      console.log(user);
      this.getUsers();
    })
    form.reset();
  }

  deleteUser(username) {
    this.dataService.deleteUser(username).subscribe(data => {
      console.log(data);
      if (data.success == true){
        for (let i=0; i < this.userList.length; i++) {
          if (username == this.userList[i].username) {
            this.userList.splice(i, 1);
          }
        }
      }
    })
  }

  toogleFormSwitch() {
    this.toogleForm = !this.toogleForm;
  }

  showChgPwForm(user) {
    this.selectedUser = user;
    this.toogleFormSwitch();
  }

  chgPwd(form) {
    let user: User = {
      username: this.selectedUser.username,
      domain: this.selectedUser.domain,
      password: form.value.password
    }
    this.dataService.chgPwd(user).subscribe(result => {
      console.log(result);
    })
    this.toogleFormSwitch();
  }

}
