import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule]
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['menuAdminId', 'nombre', 'user', 'rol', 'estadoNombre'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://4i3jzllr1l.execute-api.us-east-1.amazonaws.com/dev/usuario').subscribe({
      next: (data: any) => {
        this.dataSource.data = data?.data?.usuarios || [];
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
}