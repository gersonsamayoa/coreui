import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';

import { FormsModule } from '@angular/forms';


@Component({
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule,      TableDirective, FormsModule,PageItemDirective, PageLinkDirective, PaginationComponent    ]
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['menuAdminId', 'nombre', 'user', 'rol', 'estadoNombre'];
  dataSource = new MatTableDataSource<any>([]);
  usuarios: any[] = [];
  paginaActual = 1;
  usuariosPorPagina = 3;
  
  
  filtros = {
  estadoNombre: '',
  roles: '',
  user: '',
  usuarioNombre: ''
};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://4i3jzllr1l.execute-api.us-east-1.amazonaws.com/dev/usuario').subscribe({
      next: (data: any) => {
        this.dataSource.data = data?.data?.usuarios || [];
        this.usuarios = this.dataSource.data;
        this.dataSource.paginator = this.paginator;
         console.log('Usuarios:', data);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get usuariosPaginados() {
  const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
  return this.usuariosFiltrados.slice(inicio, inicio + this.usuariosPorPagina);
}


get usuariosFiltrados() {
  return this.usuarios.filter(usuario =>
    (!this.filtros.estadoNombre || usuario.estadoNombre?.toLowerCase().includes(this.filtros.estadoNombre.toLowerCase())) &&
    (!this.filtros.roles || usuario.roles?.toLowerCase().includes(this.filtros.roles.toLowerCase())) &&
    (!this.filtros.user || usuario.user?.toLowerCase().includes(this.filtros.user.toLowerCase())) &&
    (!this.filtros.usuarioNombre || usuario.usuarioNombre?.toLowerCase().includes(this.filtros.usuarioNombre.toLowerCase()))
  );
}

get totalPaginas() {
  return Math.ceil(this.usuariosFiltrados.length / this.usuariosPorPagina);
}

get totalPaginasArray() {
  return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
}

cambiarPaginaCore(nuevaPagina: number) {
  if (nuevaPagina < 1 || nuevaPagina > this.totalPaginas) return;
  this.paginaActual = nuevaPagina;
}


}