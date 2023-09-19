import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/invoice-services/client.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-client-controls',
  templateUrl: './client-controls.component.html',
  styleUrls: ['./client-controls.component.scss'],
})
export class ClientControlsComponent implements OnInit {
  constructor(private client: ClientService) {}

  public formValid = false;
  public formPristine = false;
  public formChanged = false;
  private clientID: string;
  clear() {
    if (this.clientID && this.formChanged) {
      this.client.reloadClient();
    } else this.client.clearClient();
    this.client.formValidation(false, true, false);
  }
  save() {
    this.client.saveClient();
  }

  ngOnInit() {
    this.client.getFormValidation().subscribe((res) => {
      this.formChanged = res.dirty;
      this.formPristine = res.pristine;
      this.formValid = res.valid;
    });
    this.client.getClient().subscribe((res) => {
      if (res) this.clientID = res._id;
    });
  }
}
