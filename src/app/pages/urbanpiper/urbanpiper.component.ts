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
