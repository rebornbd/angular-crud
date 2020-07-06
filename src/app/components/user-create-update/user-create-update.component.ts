import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CrudService } from './../../services/crud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.css']
})
export class UserCreateUpdateComponent implements OnInit {
  public form;

  name: string;
  email: string;
  address: string;

  constructor(private fb: FormBuilder,
              private crudService: CrudService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address: [''],
    });
  }

  userCreate(): void {
    const userForm = this.form.value;
    this.crudService.create_newuser(userForm);

    this.formClear();
    this.router.navigateByUrl('/users');
  }

  formClear(): void {
    this.form.reset();
  }

}
