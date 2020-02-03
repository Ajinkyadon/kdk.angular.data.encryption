import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/firebaseauth/auth.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SmartTableDatepickerRenderComponent, SmartTableDatepickerComponent } from '../smart-table-datepicker/smart-table-datepicker.component';
import { EncryptDecryptService } from 'src/app/services/encryptdecrypt/encrypt-decrypt.service';
import { HASH_KEY } from 'src/app/constants/collection.constant';
import * as CryptoJS from 'crypto-js';
import { EncryptionService } from 'angular-encryption-service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  title: string = "Employee Master";
  subtitle: string = "employee";
  employee: any;
  testt = [
    { value: 'MANAGER', title: 'MANAGER' },
    { value: 'CASHIER', title: 'CASHIER' },
    { value: 'ACCOUNENT', title: 'ACCOUNENT' },
    { value: 'HELPDESK', title: 'HELPDESK' }
  ]





  constructor(private encryptionService: EncryptionService, public auth: AuthService, private crudService: EmployeeService, private EncryptDecrypt: EncryptDecryptService) {

  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-purple sidebar-mini';

    this.crudService.ReadEmployee().subscribe(data => {

      this.employee = data.map(e => {
        return {

          id: e.payload.doc.id,
          doj: e.payload.doc.data()['doj'],
          name: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['name']).toString(),
          age: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['age']).toString(),
          mobileNumber: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['mobileNumber']).toString(),
          designation: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['designation']).toString(),
          employeeCode: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['employeeCode']).toString(),
          address: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['address']).toString(),
        };
      })
    });

  }


  demoEncrypt(passphrase, data): Promise<string> {
    return this.encryptionService.generateKey(passphrase).then(key => {
      return this.encryptionService.encrypt(data, key);
    });
  }


  SaveEmployee(recordRow) {
    console.log("SaveEmployee---->", recordRow);
    let possible = "ABCDEFGHIJKLMNOPQURSTUVWXYZABCD1234567890";
    let referc = "";
    for (let i = 0; i < 5; i++) {
      referc += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log("referc---->", referc);
    //recordRow.newData.referalCode = recordRow.newData.name.substring(0,2)+ recordRow.newData.age+referc;

    let record = {};
    record['doj'] = recordRow.newData.doj;
    record['name'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.name);

    record['age'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.age);
    record['mobileNumber'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.mobileNumber);
    record['designation'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.designation);
    record['address'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.address);
    record['employeeCode'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY,'EMP-'+referc);
    this.crudService.SaveEmployee(record);

  }

  UpdateEmployee(recordRow) {
    console.log("UpdateEmployee---->", recordRow);
    let record = {};
    record['doj'] = recordRow.newData.doj;
    record['name'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.name);

    record['age'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.age);
    record['mobileNumber'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.mobileNumber);
    record['designation'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.designation);
    record['address'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.address);
    record['employeeCode'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY,recordRow.newData.employeeCode);
    this.crudService.UpdateEmployee(recordRow.newData.id, record);
  }

  settings = {
    mode: 'inline', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete: false,

      custom: [


      ],
      position: 'left', // left|right
    },
    attr: {
      class: ''
    },
    filter: {
      inputClass: '',
    },
    edit: {
      inputClass: '',
      editButtonContent: '<i class=" btn btn-social-icon btn-xs btn-success"> <i class="glyphicon glyphicon-edit"></i></i>',
      saveButtonContent: '<i class=" btn btn-social-icon btn-xs btn-success"> <i class="glyphicon glyphicon-floppy-save"></i></i>',
      cancelButtonContent: '<i class=" btn btn-social-icon btn-xs btn-danger"> <i class="glyphicon glyphicon-remove-circle"></i></i>',
      confirmSave: true,
    },
    add: {
      inputClass: '',
      addButtonContent: '<i class=" btn btn-social-icon btn-xs btn-success"> <i class="glyphicon glyphicon-plus"></i></i>',
      createButtonContent: '<i class=" btn btn-social-icon btn-xs btn-success"> <i class="glyphicon glyphicon-floppy-save"></i></i>',
      cancelButtonContent: '<i class=" btn btn-social-icon btn-xs btn-danger"> <i class="glyphicon glyphicon-remove-circle"></i></i>',
      confirmCreate: true,
    },
    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        width: '',
      },
      designation: {
        title: 'Post',
        width: '100px',
        type: 'html',
        class: 'select2-selection select2-selection--single',
        editor: {
          type: 'list',
          config: {
            list: this.testt,
          },
        }

      },
      doj: {
        title: 'DOJ',
        type: 'custom',
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '',
        filter: true,
        sortDirection: 'desc',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        }
      },
      employeeCode: {
        title: 'Employee Code',
        width: '',
        editable: false,
        addable: false,
      },
      mobileNumber: {
        title: 'Mobile no',
        width: '',
      },
      address: {
        title: 'Address',
        width: '',
      },
      age: {
        title: 'Age',
        width: '',
      },


    },
    pager: {
      display: true,
      perPage: 5,
    },
    editor: {
      config: {
        value: 'Element Value',
        title: 'Element Title'
      }
    }
  };



}
