import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserServiceService} from '../service/user-service.service';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {IUser} from '../iuser';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  id: any;
  user: IUser;
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserServiceService,
              private activate: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // Tạo form
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  // Lấy id từ url
    this.activate.params.subscribe((params: Params) => {
      this.id = params.id;
  // Tìm user bằng Id và gán nó với đối tượng user, link với formGroup
      this.userService.getUserById(this.id).subscribe(result => {
        this.user = result;
        this.userForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          password: this.user.password
        });
      });
    });
  }
  // tslint:disable-next-line:typedef
  // Update User bằng cách lấy dữ liệu trong form và gọi hàm update bên service
  updateUser() {
    if (!this.userForm.invalid) {
      this.user.username = this.userForm.value.username;
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      console.log(this.user);
    }
    this.userService.update(this.user).subscribe(result => {
        alert('Update successfully!');
        this.router.navigate(['listUser']);
      }, error => {
        console.log(error);
      }
    );
  }
}
