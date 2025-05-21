import { Component } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective,AlertComponent  } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, FormsModule, HttpClientModule, AlertComponent, NgIf],
})
export class LoginComponent {

  objUser = this.objInit();
  blnError = false;
    visible = true;

  constructor(private http: HttpClient) { }

  login() {
    const url = 'https://4i3jzllr1l.execute-api.us-east-1.amazonaws.com/dev/login';
    this.http.post(url, this.objUser).subscribe({
      next: (response) => {
        console.log('Respuesta del login:', response);
        // Aquí puedes guardar el token y redirigir si es necesario
      },
      error: (error) => {
        this.blnError = true;
         this.visible = true;
        console.error('Error en login:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
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
    console.log('onVisibleChange', eventValue);
  }

  onResetDismiss() {
    this.visible = false;
    this.blnError = false;
  }

}
