import { Component } from '@angular/core';
import { IsvListService } from '../services/isv-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-isv-detail-page',
  templateUrl: './isv-detail-page.component.html',
  styleUrls: ['./isv-detail-page.component.css'],
})
export class IsvDetailPageComponent {
  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;

  public data: any;
  public id: any;
  public isInEditableMode = true;
  constructor(
    private isvS: IsvListService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id'); // Retrieves the 'id' parameter
      this.data = this.isvS.getIsvById(this.id);
      console.log(this.data);
    });
  }

  public onBackClick() {
    this.router.navigateByUrl('/isv-list');
  }

  public onEdit() {
    this.isInEditableMode = !this.isInEditableMode;
  }
}
