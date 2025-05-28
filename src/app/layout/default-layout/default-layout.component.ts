import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgStyle, NgIf, CommonModule } from '@angular/common';


import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective, SpinnerComponent
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent, FormsModule, ButtonDirective,
    HttpClientModule, SpinnerComponent, NgIf, CommonModule
  ]
})
export class DefaultLayoutComponent {
  @ViewChild('changePasswordModal') changePasswordModal!: ModalComponent;
  public navItems = [...navItems];
  showChangePasswordModal = false;
  currentPassword = '';
  newPassword = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  showPassword = false;
  showNewPassword = false;

  constructor(private http: HttpClient) {
    const authData = localStorage['menu'] || localStorage.getItem('menu');
    console.log('authData', authData);
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const renameNombreToName = (items: any[]): any[] =>
          items.map(item => ({
            ...item,
            name: item.nombre,
            children: item.hijos ? renameNombreToName(item.hijos) : undefined
          }));

        this.navItems = parsed.submenus
          ? renameNombreToName(parsed.submenus)
          : [];
        console.log('authData', parsed);
      } catch (e) {
        this.navItems = [...navItems];
      }
    } else {
      this.navItems = [...navItems];
    }
    console.log(this.navItems);
  }

  openChangePasswordModal() {
    this.showChangePasswordModal = true;
  }

  changePassword() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validación de campos vacíos
    if (!this.currentPassword || !this.newPassword) {
      this.errorMessage = 'Debes ingresar ambas contraseñas.';
      this.isLoading = false;
      return;
    }

    // Validación de la nueva contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(this.newPassword)) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.';
      this.isLoading = false;
      return;
    }

    const token = localStorage.getItem('token');
    const url = 'https://4i3jzllr1l.execute-api.us-east-1.amazonaws.com/dev/auth/cambiarContrasena';
    const body = {
      passwordActual: this.currentPassword,
      passwordNueva: this.newPassword
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post<any>(url, body, { headers }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.usuario.user));
        localStorage.setItem('nombre', JSON.stringify(response.data.usuario.nombre));
        this.successMessage = '¡Contraseña cambiada exitosamente!';
        this.currentPassword = '';
        this.newPassword = '';
        this.isLoading = false;
        this.showPassword = false;
        this.showNewPassword = false;
        // Espera 2 segundos y luego cierra el modal y limpia el mensaje
        setTimeout(() => {
          this.showChangePasswordModal = false;
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error al cambiar la contraseña. Verifica tus datos.';
        this.isLoading = false;
        console.error('Error al cambiar la contraseña:', error);
      }
    });
  }

  closeChangePasswordModal() {
    this.showChangePasswordModal = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.errorMessage = '';
    this.successMessage = '';
    this.showPassword = false;
    this.showNewPassword = false;
    this.isLoading = false;
  }
}





