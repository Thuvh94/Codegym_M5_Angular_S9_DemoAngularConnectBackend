import { Component, OnInit } from '@angular/core';
import {IUser} from '../iuser';
import {UserServiceService} from '../service/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  listUsers: IUser[];
  constructor(private userService: UserServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): IUser[] {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.listUsers = data;
      console.log(this.listUsers);
    });
    return this.listUsers;
  }

  // tslint:disable-next-line:typedef
  deleteUser(id) {
    if (confirm('Are you sure?')){
      this.userService.delete(id).subscribe(value => {
        console.log('Delete', value);
        this.getAllUsers();
      });
    }
  }
}
