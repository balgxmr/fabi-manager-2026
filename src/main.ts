import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  airplaneOutline, gridOutline, peopleOutline, barChartOutline,
  chevronBackOutline, chevronForwardOutline, expandOutline,
  personAddOutline, closeOutline, searchOutline,
  arrowUpOutline, arrowDownOutline, closeCircle, addCircleOutline,
  checkmarkCircle, checkmarkCircleOutline,
  arrowBackOutline, createOutline, notificationsOutline,
  navigateOutline, timeOutline, homeOutline, layersOutline, personOutline,
  calendarOutline, clipboardOutline, walkOutline,
  alertCircleOutline, alertCircle, folderOpenOutline, informationCircle,
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

addIcons({
  airplaneOutline, gridOutline, peopleOutline, barChartOutline,
  chevronBackOutline, chevronForwardOutline, expandOutline,
  personAddOutline, closeOutline, searchOutline,
  arrowUpOutline, arrowDownOutline, closeCircle, addCircleOutline,
  checkmarkCircle, checkmarkCircleOutline,
  arrowBackOutline, createOutline, notificationsOutline,
  navigateOutline, timeOutline, homeOutline, layersOutline, personOutline,
  calendarOutline, clipboardOutline, walkOutline,
  alertCircleOutline, alertCircle, folderOpenOutline, informationCircle,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
