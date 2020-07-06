import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/services/crud.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public form;
  public users;

  public isEditable: boolean;
  public onlyView: boolean;

  public userid: string;
  public username: string;
  public useremail: string;
  public useraddress: string;

  constructor(private crudService: CrudService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isEditable = false;
    this.onlyView = false;

    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address: [''],
    });

    this.crudService.get_allusers()
      .subscribe(
        data => {
          this.users = data.map(e => {
            return {
              id: e.payload.doc.id,
              // tslint:disable-next-line:no-string-literal
              name: e.payload.doc.data()['name'],
              // tslint:disable-next-line:no-string-literal
              email: e.payload.doc.data()['email'],
              // tslint:disable-next-line:no-string-literal
              address: e.payload.doc.data()['address']
            };
          });
          // console.log(this.users);
    });
  }

  editUser(user): void {
    this.isEditable = true;

    this.userid = user.id;
    this.username = user.name;
    this.useremail = user.email;
    this.useraddress = user.address;
  }

  updateUser(): void {
    const userForm = this.form.value;
    const id = this.form.value.id;
    this.crudService.update_user(id, userForm);
    this.isEditable = false;
  }

  viewUser(user): void {
    this.onlyView = true;

    this.userid = user.id;
    this.username = user.name;
    this.useremail = user.email;
    this.useraddress = user.address;
  }

  viewEnd(): void {
    this.onlyView = false;
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure to delete!')) {
      this.crudService.delete_user(id);
    }
  }

}
