import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserServiceService} from '../service/user-service.service';
import {IUser} from '../iuser';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  newUserForm: FormGroup;
  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private userService: UserServiceService) { }

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
    });
  }

}
