import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {SessionFormService} from "../../views/forms/session-form.service";
import {BasicUser} from "../../models/basic-user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  loginForm!: FormGroup;
  user!: BasicUser;

  ngOnInit() {
    this.loginForm = this.formService.getLoginForm()
  }

  constructor(private formService: SessionFormService, private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.user = this.loginForm.value;
    this.authService.login(this.user).subscribe({
        next: (data: any) => {
          console.log(data)
          let jwtToken = data.token;
          this.authService.saveToken(jwtToken);
          if (this.authService.getRoles().includes("admin") || this.authService.getRoles().includes("manager")) {
            this.router.navigate(['dashboard']);
          }
        }
      }
    );
  }
}
