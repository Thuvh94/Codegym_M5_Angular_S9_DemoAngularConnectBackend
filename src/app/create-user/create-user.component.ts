import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserServiceService} from '../service/user-service.service';
import {IUser} from '../iuser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  newUserForm: FormGroup;
  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private userService: UserServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
      }
    );
  }

  // tslint:disable-next-line:typedef
  createUser(){
    const newU: IUser = this.newUserForm.value;
    this.userService.create(newU).subscribe(() => {
        alert('Create successfully!');
        this.router.navigate(['listUser']);
    });
  }

}
