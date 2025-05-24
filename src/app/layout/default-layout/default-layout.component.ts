import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

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
  SidebarTogglerDirective
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
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent {
  public navItems = [...navItems];

   constructor() {
    const authData = localStorage['authData'];
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const renameNombreToName = (items: any[]): any[] =>
          items.map(item => ({
            ...item,
            name: item.nombre,
            children: item.hijos ? renameNombreToName(item.hijos) : undefined
          }));

        this.navItems = parsed.menu.submenus
          ? renameNombreToName(parsed.menu.submenus)
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

  
}
