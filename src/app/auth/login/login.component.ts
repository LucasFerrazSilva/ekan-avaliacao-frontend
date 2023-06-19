import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Credentials } from '../credentials.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from './validation-error.interface';
import { Token } from '../token.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errors: string[] = [];

  form = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const credentials = this.form.getRawValue() as Credentials;
    this.authService.login(credentials).subscribe({
      error: err => this.handleError(err)
    });
  }

  private handleLoginSuccess(data: Token) {
    this.router.navigate(['/']);
  }

  private handleError(err: HttpErrorResponse) {
    this.errors = [];
    if (Array.isArray(err.error)) {
      err.error.forEach(error => this.errors.push(`${error.field}: ${error.message}`));
    } else {
      this.errors.push(err.error as string);
    }
  }

}
