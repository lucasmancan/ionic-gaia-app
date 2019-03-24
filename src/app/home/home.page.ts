import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public showToolbar: boolean = false;
  public products: any[] = [];
  constructor(private qrScanner: QRScanner, private appService: AppService) { }

  runScanner() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log("Scanned something", text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log("Error is", e));
  }

  manageToolbar() {
    this.showToolbar = !this.showToolbar;
  }

  searchAndBack(event) {
    this.manageToolbar();
    console.log(event);
  }

  search(event) {
    console.log(event);
  }

  ngOnInit() {
    this.appService.getProduct().subscribe(res => {
      this.products = res;
    });
  }

  remove(product) {
    this.appService.remove(product.id);
  }
}
