import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recibo-egreso',
  templateUrl: './recibo-egreso.component.html',
  styleUrls: ['./recibo-egreso.component.css']
})
export class ReciboEgresoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    document.querySelectorAll('.flip-button').forEach(button => {
      button.addEventListener('click', () => {
        const cardWrapper = button.closest('.card-wrapper');
        cardWrapper?.classList.toggle('flipped');
      });
    });
  }


  
}
