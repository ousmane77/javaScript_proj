import { Component } from '@angular/core';
import { Produit } from './home.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  produits: Produit[];
  resto: [];
	
	constructor(private param:ActivatedRoute, private route: Router, private http: HttpClient) { }

  ngOnInit() {
    this.get()
    
  }
  go(id)
{
   this.route.navigate(['/detail/'+id]);
}
  get() 
  {
    this.http.get('http://localhost:3000/resto/').subscribe((response) => {
      this.resto = response['result'];
      console.log(this.resto);
  
    })
}
}
