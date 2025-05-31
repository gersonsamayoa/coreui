import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDirective } from '@coreui/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.scss'],
  imports: [CommonModule, TableDirective],
})
export class UsuariosComponent implements OnInit {
  constructor(private http: HttpClient) {}
 usuarios: any[] = []; // Array to hold user data

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get('https://4i3jzllr1l.execute-api.us-east-1.amazonaws.com/dev/usuario').subscribe({
      next: (data: any) => {    
        this.usuarios = data?.data?.usuarios; 
        console.log('Usuarios:', this.usuarios);
      },  
      error: (error) => {
        console.error('Error:', error);
      }
    });
  } 
}

