import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import {
  DataService,
  SideBar,
  SideBarMenu,
  routes,
} from 'src/app/core/core.index';
import { LocalConstant } from 'src/app/core/helpers/constants/local.constant';
import { LocalService } from 'src/app/core/services/local/local.service';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { CommonService } from 'src/app/shared/common/common.service';

@Component({
  selector: 'app-side-menu-one',
  templateUrl: './side-menu-one.component.html',
  styleUrls: ['./side-menu-one.component.scss'],
})
export class SideMenuOneComponent implements OnDestroy, OnInit {
  routes = routes;
  multilevel: Array<boolean> = [false, false, false];
  base = 'dashboard';
  page = '';
  last = '';
  role!: number;
  openMenuItem: any = null;
  openSubmenuOneItem: any = null;
  side_bar_data: Array<SideBar> = [];

  public router = inject(Router);
  private localService = inject(LocalService);
  private data = inject(DataService);
  private sideBar = inject(SideBarService);
  private common = inject(CommonService);

  constructor() {
    this.role = this.localService.getLocalItem(LocalConstant.ROLE);
    this.router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        const splitVal = event.url.split('/');
        this.base = splitVal[1];
        this.page = splitVal[2];
        this.last = splitVal[3];
        console.log('base', this.base);
        console.log('page', this.page);
        console.log('last', this.last);
      }
    });
    // get sidebar data as observable because data is controlled for design to expand submenus
    if (this.role === 0) {
      this.data.getSideBarData.subscribe((res: Array<SideBar>) => {
        this.side_bar_data = res;
        console.log(this.side_bar_data);
      });
    } else {
      this.data.getUserSideBarData.subscribe((res: Array<SideBar>) => {
        this.side_bar_data = res;
        console.log(this.side_bar_data);
      });
    }
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.page.subscribe((res: string) => {
      this.last = res;
    });
  }

  ngOnInit(): void {}

  public miniSideBarMouseHover(position: string): void {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }
  public expandSubMenus(menu: SideBarMenu): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus: SideBar) => {
      mainMenus.menu.map((resMenu: SideBarMenu) => {
        // collapse other submenus which are open
        if (resMenu.menuValue === menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
          if (menu.showSubRoute === false) {
            sessionStorage.removeItem('menuValue');
          }
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.data.resetData();
  }
  miniSideBarBlur(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  miniSideBarFocus(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }
  openMenu(menu: any): void {
    if (this.openMenuItem === menu) {
      this.openMenuItem = null;
    } else {
      this.openMenuItem = menu;
    }
  }
  openSubmenuOne(subMenus: any): void {
    if (this.openSubmenuOneItem === subMenus) {
      this.openSubmenuOneItem = null;
    } else {
      this.openSubmenuOneItem = subMenus;
    }
  }
}
