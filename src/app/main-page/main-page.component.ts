import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  gender: string = '';
  genders: string[] = ['Male', 'Female'];
  public uName = '';
  public state = '';
  public aadhar = '';
  public mobile = '';
  public dob = '';
  vwTaluk = '';
  vwDistrict = '';
  taluk = ['1', '2', '3'];
  district = ['1', '2', '3'];
  pincode = '';
  city = '';

  ngOnInit(): void {
    this.api.getSmartphone().subscribe((data) => {
      console.log(data);
    });
  }
  changeValue(event: string) {
    // alert(event);
  }

  register(event: Event) {
    const resgisterData = {
      UserName: this.uName,
      UserAddress1: 'string',
      UserAddress2: 'string',
      PinCode: this.pincode,
      City: this.city,
      District: this.vwDistrict,
      Taluk: this.vwTaluk,
      State: this.state,
      Phone: this.mobile,
      AltPhone: this.mobile,
      Aadhar: this.aadhar,
      Gender: this.gender,
      DOB: this.dob,
    };
    if (!/\d{4}\d{4}\d{4}/.test(this.aadhar.toString())) {
      alert('Invalid AADHAR');
    }
    this.api.registerUserData(resgisterData).subscribe((data) => {
      console.log(data);
    });
  }

  onPinChange(searchValue: Event) {
    // console.log(/\d{4}\d{4}\d{4}\d{4}/.test('1000100010001002'));

    if (this.pincode.toString().length === 6) {
      this.api.getDetailOnPinCode(this.pincode).subscribe((_val) => {
        console.log(JSON.parse(JSON.stringify(_val)).location);
        this.vwDistrict = JSON.parse(JSON.stringify(_val)).location[0].city;
        this.district = [JSON.parse(JSON.stringify(_val)).location[0].city];
        this.state = JSON.parse(JSON.stringify(_val)).location[0].state;
      });
    }
  }
}
