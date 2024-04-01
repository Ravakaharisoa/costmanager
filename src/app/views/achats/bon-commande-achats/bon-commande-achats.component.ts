import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from "../../../shared/service/fournisseur.service";
import { CommandeService } from "../../../shared/service/commande.service";
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { InterfaceBonCommande } from '../../../shared/model/interface-bonCommande';

import { Centrerevenu } from '../../../shared/model/centrerevenu';
import { InterfaceCentreRevenu } from 'src/app/shared/model/interface-centrerevenu';

@Component({
  selector: 'app-bon-commande-achats',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './bon-commande-achats.component.html',
  styleUrl: './bon-commande-achats.component.scss'
})
export class BonCommandeAchatsComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private fournisseurService:FournisseurService,
    private commandeService : CommandeService,
  ){}
  public toggle = true;
  public modifToggle = true;
  public showlist = true;
  public bonCommandeForm = FormGroup;
  public modalFournisseur = 'none';

  public fournisseur: any;
  public fournisseurs: any;

  public commandes: any;

  public bonCommande: InterfaceBonCommande;
  public centreRevenus: Centrerevenu;
  public centreRevenu: InterfaceCentreRevenu;
  public operateurId = sessionStorage.getItem('id');

  toggleModal() {
    this.toggle = !this.toggle;
  }

  addToggleModal(){
    
    if (this.fournisseurs.id>0) {
      this.selectOnFournisseur();
      this.modifToggle = !this.modifToggle;
      this.toggle = (this.toggle === false ? true : false);
      this.modalFournisseur = 'none';
    } else {
      this.modalFournisseur = 'block';
    }
  
  }

  showListToggle(){
    this.showlist = (this.showlist === false ? true : false);
  }

  

  ngOnInit():void{
    this.fournisseurService.getAllFournisseur().subscribe({
      next:(founisseur) =>{
        this.fournisseurs = founisseur;
        console.log(this.fournisseurs);
      },
      error:(error) =>{
        alert('Liste fournisseur vide')
      }
    });

    this.commandeService.getAllCommande().subscribe({
      next:(commande)=>{
        this.commandes = commande;
        console.log(this.commandes);
        
      },
      error:(error) =>{
        alert('Liste de bon de commande vide');
      }
    })
  }

  openModalFournisseur(){
    this.modalFournisseur = 'block';
  }

  cancel(){}

  showFournisseur(fournisseur:any){
    this.fournisseurs = fournisseur;
    console.log(this.fournisseurs);   
  }

  showCommande(comm:any){
    this.commandes = comm;
    console.log(this.commandes);
    this.toggleModal();
  }

  addBonCommande(bonCommande?:any){
    this.commandeService.createBonCommande(bonCommande);
  }
  
 public selectOnFournisseur(){
  this.fournisseurService.getOneFournisseur(this.fournisseurs.id).subscribe({
    next:(fournisseur) =>{
      this.fournisseur = fournisseur;
      console.log(this.fournisseur);
      
    },
    error:(error) => {
      console.log(error);
    }
  })
 }
}
