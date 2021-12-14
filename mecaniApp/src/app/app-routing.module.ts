import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'welcome2',
    loadChildren: () => import('./pages/welcome2/welcome2.module').then( m => m.Welcome2PageModule)
  },
  {
    path: 'welcome3',
    loadChildren: () => import('./pages/welcome3/welcome3.module').then( m => m.Welcome3PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'workshops',
    loadChildren: () => import('./pages/workshops/workshops.module').then( m => m.WorkshopsPageModule)
  },
  {
    path: 'suggestions',
    loadChildren: () => import('./pages/suggestions/suggestions.module').then( m => m.SuggestionsPageModule)
  },
  {
    path: 'taller/:id',
    loadChildren: () => import('./pages/hire/hire.module').then( m => m.HirePageModule)
  },
  {
    path: 'complain',
    loadChildren: () => import('./pages/complain/complain/complain.module').then( m => m.ComplainPageModule)
  },
  {
    path: 'viewcomplain',
    loadChildren: () => import('./pages/complain/viewcomplain/viewcomplain.module').then( m => m.ViewcomplainPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
  },
];


// @ts-ignore
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
