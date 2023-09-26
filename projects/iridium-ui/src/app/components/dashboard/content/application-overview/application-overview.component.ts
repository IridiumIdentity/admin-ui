import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DynamicContentViewItem } from '../dynamic-content-view-item';
import { ApplicationSummary } from '../../domain/application-summary';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CookieService } from '../../../../services/cookie.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApplicationTypeService } from '../../../../services/application-type.service';
import { ApplicationTypeSummary } from '../../domain/application-type-summary';
import { ApplicationService } from '../../../../services/application.service';
import { ClientSecretService } from '../../../../services/client-secret.service';

@Component({
  selector: 'update-application-dialog',
  templateUrl: 'update-application-dialog.html',
  styleUrls: ['/update-application-dialog.css'],
})
export class UpdateApplicationDialog {
  updateApplicationFormGroup: UntypedFormGroup;
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<ApplicationOverviewComponent>,
    private _formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateApplicationFormGroup = this._formBuilder.group({
      applicationName: [this.data.application.name, Validators.required],
      clientId: [{ value: this.data.application.clientId, disabled: true }],
      clientSecret: [
        { value: this.data.application.clientSecret, disabled: true },
      ],
      homepageURL: [this.data.application.homepageURL, Validators.required],
      description: [this.data.application.description],
      authorizationCallbackURL: [
        this.data.application.callbackURL,
        Validators.required,
      ],
      applicationTypeId: [
        this.data.application.applicationTypeId,
        Validators.required,
      ],
      privacyPolicyURL: [this.data.application.privacyPolicyUrl],
      iconURL: [this.data.application.iconURL],
    });
  }

  update() {
    this.dialogRef.close({ formGroup: this.updateApplicationFormGroup });
  }
}
@Component({
  selector: 'create-application-dialog',
  templateUrl: 'create-application-dialog.html',
  styleUrls: ['/create-application-dialog.css'],
})
export class CreateApplicationDialog {
  createApplicationFormGroup: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<ApplicationOverviewComponent>,
    private _formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createApplicationFormGroup = this._formBuilder.group({
      applicationName: ['', Validators.required],
      homepageURL: ['', Validators.required],
      description: [''],
      authorizationCallbackURL: ['', Validators.required],
      applicationTypeId: ['', Validators.required],
    });
  }

  create() {
    console.log('form group', this.createApplicationFormGroup);
    this.dialogRef.close({ formGroup: this.createApplicationFormGroup });
  }
}

type ApplicationTypeSummaryMapType = {
  [id: string]: ApplicationTypeSummary;
};
@Component({
  selector: 'app-front-end-client-overview',
  templateUrl: './application-overview.component.html',
  styleUrls: ['./application-overview.component.css'],
})
export class ApplicationOverviewComponent
  implements DynamicContentViewItem, OnInit
{
  @Input() data: any;

  displayedColumns: string[] = ['name', 'clientId', 'type'];
  dataSource: ApplicationSummary[] = [];
  applicationTypes: ApplicationTypeSummary[] = [];
  applicationTypeMap: ApplicationTypeSummaryMapType = {};
  webServiceApplicationTypeId = '';

  constructor(
    private clientSecretService: ClientSecretService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private _formBuilder: UntypedFormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private applicationTypeService: ApplicationTypeService,
    private applicationService: ApplicationService
  ) {}

  create() {
    const dialogRef = this.dialog.open(CreateApplicationDialog, {
      data: {
        applicationTypes: this.applicationTypes,
        tenantId: this.data.tenantId,
        webServiceApplicationTypeId: this.webServiceApplicationTypeId,
      },
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.applicationService
        .create(result.formGroup, this.data.tenantId)
        .subscribe(response => {
          if (this.webServiceApplicationTypeId === response.applicationTypeId) {
            console.log('this is a client secret');
            this.clientSecretService
              .create(this.data.tenantId, response.id)
              .subscribe(result => {
                console.log('client secret create good ', result);
              });
          }
          this.refreshDataSource();
        });
    });
  }
  onRowClick(index: number) {
    console.log(this.dataSource[index]);
    this.applicationService
      .get(this.data.tenantId, this.dataSource[index].id)
      .subscribe(applicationResponse => {
        const dialogRef = this.dialog.open(UpdateApplicationDialog, {
          data: {
            applicationTypes: this.applicationTypes,
            tenantId: this.data.tenantId,
            application: applicationResponse,
            webServiceApplicationTypeId: this.webServiceApplicationTypeId,
          },
        });
        dialogRef.afterClosed().subscribe(updateResult => {
          console.log('update result', updateResult)
          this.applicationService
            .update(
              updateResult.formGroup,
              this.data.tenantId,
              this.dataSource[index].id
            )
            .subscribe(result => {
              console.log('update result is: ', result);
              this.refreshDataSource();
            });
        });
      });
  }

  ngOnInit(): void {
    this.applicationTypeService.get().subscribe(applicationTypes => {
      this.applicationTypes = applicationTypes;

      for (let i = 0; i < applicationTypes.length; i++) {
        if (applicationTypes[i].name === 'Web Service Application') {
          console.log('web service app ', applicationTypes[i]);
          this.webServiceApplicationTypeId = applicationTypes[i].id;
        }
        this.applicationTypeMap[applicationTypes[i].id] = applicationTypes[i];
      }
      this.refreshDataSource();
    });
  }

  private refreshDataSource() {
    this.dataSource = [];
    this.applicationService
      .getPage(this.data.tenantId, 100)
      .subscribe(applicationSummaries => {
        for (let i = 0; i < applicationSummaries.data.length; i++) {
          let summary = applicationSummaries.data[i];
          const newRow = {
            id: summary.id,
            name: summary.name,
            clientId: summary.clientId,
            type: this.applicationTypeMap[summary.applicationTypeId].name,
          };
          this.dataSource = [...this.dataSource, newRow];
        }
      });
  }
}
