import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-urbanpaper',
  templateUrl: './urbanpiper.component.html',
  styleUrls: ['./urbanpiper.component.scss']
})
export class UrbanpiperComponent implements OnInit {

  public show: boolean = false;
  public buttonName: any = 'Back';
  uptable: any = [];

  hide = true;
  editprofile = true;
  url: string | ArrayBuffer;

  merchants: any = [];
  current_merchant: any;
  showdetails: boolean = false;
  gotdata: boolean = false;
  webhooks = [
    { name: "store_creation", url: "https://biz1pos.azurewebsites.net/api/UrbanPiper/AddStoreCallback" },
    { name: "inventory_update", url: "https://biz1pos.azurewebsites.net/api/UrbanPiper/CatalogueCallback" },
    { name: "order_placed", url: "https://biz1pos.azurewebsites.net/api/UrbanPiper/Order" },
    { name: "item_state_toggle", url: "https://biz1pos.azurewebsites.net/api/UrbanPiper/ItemActionCallback" },
    { name: "order_status_update", url: "https://biz1pos.azurewebsites.net/api/UrbanPiper/OrderStatusCallBack" },
    { name: "rider_status_update", url: "https://biz1pos.azurewebsites.net/api/UrbanPiper/RiderStatusCallback" }
  ]
  unconfiguredwebhooks = [];
  constructor(
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  openDialogWithoutRef() {
    this.dialog.open(this.secondDialog);
  }

  ngOnInit() {
    this.getmerchants();
  }
  getmerchants() {
    this.auth.getmerchants().subscribe(data => {
      console.log(data);
      this.merchants = data["results"];
    })
  }
  getmerchant(bizid, merchant_name) {
    this.showdetails = true;
    this.auth.getmerchant(bizid).subscribe(data => {
      console.log(data);
      this.current_merchant = data;
      this.current_merchant.webhooks = [];
      this.current_merchant.name = merchant_name;
      this.gotdata = true;
    })
  }
  getwebhooks() {
    if (this.current_merchant.UPUsername != '' && this.current_merchant.UPAPIKey != '') {
      this.auth.getwebhooks(this.current_merchant.UPUsername + ':' + this.current_merchant.UPAPIKey).subscribe(data => {
        console.log(data)
        this.unconfiguredwebhooks = this.webhooks;
        data["webhooks"].forEach(hook => {
          this.unconfiguredwebhooks = this.unconfiguredwebhooks.filter(x => x.name != hook.event_type);
        });
        this.current_merchant.webhooks = data["webhooks"];
      })
    }
  }
  savemerchant(){
    this.auth.savemerchant(this.current_merchant).subscribe(data => {
      console.log(data);      
    })
  }
  updatewebhook(hook) {
    var webhook = Object.assign({}, hook);
    webhook.headers = JSON.parse(webhook.headers);
    var webhook_id = webhook.webhook_id;
    delete webhook.webhook_id;
    webhook.active = !webhook.active;
    if (this.current_merchant.UPUsername != '' && this.current_merchant.UPAPIKey != '') {
      this.auth.updatewebhook(webhook_id, webhook, this.current_merchant.UPUsername + ':' + this.current_merchant.UPAPIKey).subscribe(data => {
        console.log(data);
        this.getwebhooks();
      })
    }
  }
  addwebhook(hook) {
    var payload = {
      "active": true,
      "event_type": hook.name,
      "retrial_interval_units": "seconds",
      "url": hook.url,
      "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer "+this.current_merchant.jwt
      }
    }
    console.log(payload);
    this.auth.addwebhook(payload, this.current_merchant.UPUsername + ':' + this.current_merchant.UPAPIKey).subscribe(data => {
      console.log(data);
      this.getwebhooks();
    })
  }



  ////////////////////////////////////////////////////////////////////
  getuptable() {
    this.auth.GetUPCompanies().subscribe(data => {
      console.log(data);
      this.uptable = data;
      // this.issues = data;
    })
  }

  closealldialog() {
    this.dialog.closeAll()
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Back";
    else
      this.buttonName = "Back";
  }

}
