import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  type: String;
  constructor(private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.type = params['type'];
    })
  }

}
