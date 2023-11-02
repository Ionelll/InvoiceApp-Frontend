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

  clear() {
    let clientID = localStorage.getItem('ClientId');
    if (clientID && this.formChanged) {
      this.client.reloadClient(clientID);
    } else this.client.clearClient();
  }
  save() {
    let clientID = localStorage.getItem('ClientID');
    this.client.saveClient(clientID);
  }

  ngOnInit() {
    this.client.getFormValidation().subscribe((res) => {
      this.formChanged = res.dirty;
      this.formPristine = res.pristine;
      this.formValid = res.valid;
    });
  }
}
