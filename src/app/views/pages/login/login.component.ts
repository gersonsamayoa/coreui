import { Component } from '@angular/core';
import { NgStyle, NgIf, CommonModule } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, AlertComponent, SpinnerComponent } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, FormsModule, HttpClientModule, AlertComponent, NgIf, CommonModule, SpinnerComponent],
})
export class LoginComponent {

  objUser = this.objInit();
  blnError = false;
  visible = true;
  showPassword = false;
  isLoading = false;
  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.isLoading = true;
    const url = 'https://4i3jzllr1l.execute-api.us-east-1.amazonaws.com/dev/login';
    this.http.post<any>(url, this.objUser).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.blnError = false;
        this.visible = false;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.usuario.user));
        localStorage.setItem('nombre', JSON.stringify(response.data.usuario.nombre));
        localStorage.setItem('menu', JSON.stringify(response.data.menu));
        // Redirigir a la página de inicio o a otra página después del inicio de sesión exitoso
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.blnError = true;
        this.visible = true;
        console.error('Error en login:', error);
      }
    });
  }

  objInit() {
    return {
      username: '',
      password: ''
    };
  }



  onVisibleChange(eventValue: boolean) {
    this.visible = eventValue;
  }

  onResetDismiss() {
    this.visible = false;
    this.blnError = false;
  }

}
