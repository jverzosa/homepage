import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'billing',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: "http://localhost:4100/remoteEntry.js",
        remoteName: 'billing',
        exposedModule: './BillingModule'
      }).then(m => m.BillingModule).catch(error =>
        console.log('Error=>', error));
    }
  },
  {
    path: 'reports',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: "http://localhost:4300/remoteEntry.js",
        remoteName: 'reports',
        exposedModule: './ReportModule'
      }).then(m => m.ReportModule).catch(error =>
        console.log('Error=>', error));
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
