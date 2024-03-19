import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { InterfaceOperateur } from 'src/app/shared/model/interfaceOperateur';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private loginService: LoginService) {
    super();
  }

  public operateurData: InterfaceOperateur= {
    id:0,
    nom: '',
    prenom: '',
    email: '',
    mdp:  '',
    compteConnecte: false,
    actif: true,
    login_count: 0,
    code: '',
    adresseId: 0,
    contactId: 0,
    exploitationId:     0,
    centreId:           0
  };

  public operateurId = localStorage.getItem('operateurId');

  public onLogout(){
    this.loginService.logout(this.operateurId);
  }

}
