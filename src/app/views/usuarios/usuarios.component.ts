import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDirective } from '@coreui/angular';

@Component({
  standalone: true,
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.scss'],
  imports: [CommonModule, TableDirective]
})
export class UsuariosComponent implements OnInit {
  ngOnInit(): void {
    // Initialization logic here
  }
}

