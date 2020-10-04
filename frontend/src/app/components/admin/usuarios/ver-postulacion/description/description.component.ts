import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {CorreosService} from '../../../../../services/correos.service'
import { SnackBar} from '../../../../../services/snackbar.service'
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  form:any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DescriptionComponent>,
    private snackBar:SnackBar,
    public correosService: CorreosService,
    private loadingBar:LoadingBarService
  ) {
    this.form = fb.group({
      description:""
    })
  }

  ngOnInit(): void {
  }

  send(){
    const message = {
      usuario:this.data,
      description:this.form.value.description
    }
    console.log(message)
    this.correosService.postulacionRechazada(message).subscribe((response:any)=>{
      console.log(response.status)
      if(response.status === 200){
        this.snackBar.success("Correo Enviado","X")
        this.dialogRef.close()
        this.loadingBar.complete()
      }
    },
    err=>{
      this.snackBar.err(err.message,"x")
    })
  }

}
