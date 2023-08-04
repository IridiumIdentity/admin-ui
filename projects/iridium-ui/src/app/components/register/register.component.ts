import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxIridiumClientService } from '@iridiumidentity/ngx-iridium-client';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private iridiumClient: NgxIridiumClientService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public signIn() {
    this.iridiumClient.authenticateWithExternalRedirect();
  }
  public register() {
    this.iridiumClient.authenticateWithExternalRedirect();
  }
}
