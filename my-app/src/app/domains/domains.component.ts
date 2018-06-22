import { Component, OnInit } from '@angular/core';
import { Domain } from '../domain';
import { DataService } from '../data.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css'],
  providers: [DataService],
})
export class DomainsComponent implements OnInit {

  domainList: Domain[] = [];
  selectedDomain: Domain;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getDomains();
  }

  getDomains() {
    this.dataService.getDomainList().subscribe(domains => {
      this.domainList = domains;
    })
  }

  addDomain(form) {
    let newDomain: Domain = {
      domain: form.value.domain
    }
    console.log('Domäne: ' + newDomain.domain);
    this.dataService.addDomain(newDomain).subscribe(domain =>{
      console.log(domain);
      this.getDomains();
    })
    form.reset();
  }

  deleteDomain(domain) {
    this.dataService.deleteDomain(domain).subscribe(data => {
      console.log(data);
      if (data.success == true){
        for (let i=0; i < this.domainList.length; i++) {
          if (domain == this.domainList[i].domain) {
            this.domainList.splice(i, 1);
          }
        }
      }
    })
  }

}
