import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {User} from "./user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  Users: any = [];

  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.loadUsers();
  }

  // Get employees list
  loadUsers() {
    return this.apiService.getUsers().subscribe((data: {}) => {
      this.Users = data;
      console.log(this.Users);
    })
  }
}
