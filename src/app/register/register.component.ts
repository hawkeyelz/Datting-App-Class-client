import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../Services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private accountSerive:AccountService) {}

  ngOnInit(): void {}

  register() {
    this.accountSerive.register(this.model).subscribe(Response=>{
      console.log(Response);
      this.cancel();
    }, error => {
      console.error(error);
    });
  }
  cancel(){
    this.cancelRegister.emit(false);
    console.log('Canceled form');
  }
}