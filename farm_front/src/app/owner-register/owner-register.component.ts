import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../owner_service/owner.service';
import { Owner } from '../owner_service/owner.model';

@Component({
  selector: 'app-owner-register',
  templateUrl: './owner-register.component.html',
  styleUrls: ['./owner-register.component.scss']
})
export class OwnerRegisterComponent implements OnInit {
  
  owner: Owner = {
    name: '',
    document_type: 'CPF',
    document: '00000000000',
    is_active: true
  }

  constructor(private ownerService: OwnerService, private route: Router) { }

  ngOnInit() {

  }

  submitForm(): void {
      this.ownerService.createOwner(this.owner).subscribe(() => {
        this.ownerService.createdMessage(`Created farm named: ${this.owner.name}`)
        this.route.navigate([''])
      })
  }

}
