import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MustMatch} from "../../../../helpers/must-match.validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  error: Error | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  register() {
    if (this.registerForm.valid) {
      const user = {
        ...this.registerForm.value,
      }
      delete user.confirmPassword;
      this.authService.register(user).subscribe(
        response => {
          this.router.navigate(['/add-object']);
        },
        error => {
          console.error(error);
          this.error = error.error;
        }
      );
    }
  }


}
