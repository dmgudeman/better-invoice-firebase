import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss']
})
export class TempComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
	gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		
}

// https://stackoverflow.com/questions/4920281/how-to-change-the-size-of-the-radio-button-using-css