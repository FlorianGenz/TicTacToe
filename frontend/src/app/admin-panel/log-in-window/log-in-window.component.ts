import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-log-in-window',
  templateUrl: './log-in-window.component.html',
  styleUrls: ['./log-in-window.component.scss']
})
export class LogInWindowComponent implements OnInit{

  logInForm = this.formBuilder.group({
    username: '',
    password: ''
  })

  constructor(private formBuilder: FormBuilder, private backendService: BackendService) {
  }

  ngOnInit() {
    this.showDialog()
  }

  showDialog(){
    let loginDialog = document.getElementById("loginDialog") as HTMLDialogElement;
    loginDialog.show();
  }

  closeDialog(){
    let loginDialog = document.getElementById("loginDialog") as HTMLDialogElement;
    loginDialog.close();
  }

  logIn(){
    let username = this.logInForm.value.username;
    let password = this.logInForm.value.password;
    if (username && password) {
      this.backendService.logIn([username, password]).subscribe(valid => {
        if (valid){
          this.closeDialog();
        }else {
          this.logInForm.reset();
        }
      })
    }
  }
}
