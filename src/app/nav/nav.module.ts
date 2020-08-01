import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// material module
import { NavMaterialModule } from './nav-material.module';
// import module
import { HeaderComponent } from './header/header.component';
import { StickyNavbarComponent } from './header/sticky-navbar/sticky-navbar.component';
import { MainNavbarComponent } from './header/main-navbar/main-navbar.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { SearchBarComponent } from './header/main-navbar/search-bar/search-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopSidenavComponent } from './sidenav/top-sidenav/top-sidenav.component';
import { AccountSidenavComponent } from './sidenav/account-sidenav/account-sidenav.component';
import { MenuSidenavComponent } from './sidenav/menu-sidenav/menu-sidenav.component';
import { DashboardSidenavComponent } from './sidenav/dashboard-sidenav/dashboard-sidenav.component';
import { HelpSidenavComponent } from './sidenav/help-sidenav/help-sidenav.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    StickyNavbarComponent,
    MainNavbarComponent,
    NavbarComponent,
    SearchBarComponent,
    SidenavComponent,
    TopSidenavComponent,
    AccountSidenavComponent,
    MenuSidenavComponent,
    DashboardSidenavComponent,
    HelpSidenavComponent
  ],
  imports: [
    CommonModule,
    NavMaterialModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    StickyNavbarComponent,
    MainNavbarComponent,
    NavbarComponent,
    SearchBarComponent,
    SidenavComponent,
    TopSidenavComponent,
    AccountSidenavComponent,
    MenuSidenavComponent,
    DashboardSidenavComponent,
    HelpSidenavComponent,
    RouterModule,
    CommonModule,
    SharedModule
  ]
})
export class NavModule {

}
