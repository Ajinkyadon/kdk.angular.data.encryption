

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/firebaseauth/auth.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SmartTableDatepickerRenderComponent, SmartTableDatepickerComponent } from '../smart-table-datepicker/smart-table-datepicker.component';
import { EncryptDecryptService } from 'src/app/services/encryptdecrypt/encrypt-decrypt.service';
import { HASH_KEY } from 'src/app/constants/collection.constant';
import * as CryptoJS from 'crypto-js';
import { EncryptionService } from 'angular-encryption-service';
import { CustomerService } from 'src/app/services/customer/customer.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  title: string = "Customer Master";
  subtitle: string = "customer";
  employee: any;
  accountType = [
    { value: 'CREDIT', title: 'MANAGER' },
    { value: 'DEBIT', title: 'CASHIER' },
    { value: 'SAVING', title: 'ACCOUNENT' },
    { value: 'DMAT', title: 'HELPDESK' }
  ]





  constructor(private encryptionService: EncryptionService, public auth: AuthService, private crudService: CustomerService, private EncryptDecrypt: EncryptDecryptService) {

  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-purple sidebar-mini';

    this.crudService.ReadCustomer().subscribe(data => {

      this.employee = data.map(e => {
        return {

          id: e.payload.doc.id,
          name: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['name']).toString(),
          accountType:this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['accountType']).toString(),
          ifscCode: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['ifscCode']).toString(),
          accountNo: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['accountNo']).toString(),
          doj: e.payload.doc.data()['doj'],
          age: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['age']).toString(),
          mobileNumber: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['mobileNumber']).toString(),
          address: this.EncryptDecrypt.get(HASH_KEY.MY_PRIVATE_KEY, e.payload.doc.data()['address']).toString(),
        };
      })
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
   
    record['name'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.name);
    record['accountType'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.accountType);
    record['accountNo'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.accountNo);
    record['ifscCode'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.ifscCode);
    record['doj'] = recordRow.newData.doj;
    record['mobileNumber'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.mobileNumber);
    record['age'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.age);
    record['address'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.address);
    record['mobile'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY,recordRow.newData.mobile);
    this.crudService.SaveCustomer(record);

  }

  UpdateEmployee(recordRow) {
    console.log("UpdateEmployee---->", recordRow);
    let record = {};
    record['name'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.name);
    record['accountType'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.accountType);
    record['accountNo'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.accountNo);
    record['ifscCode'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.ifscCode);
    record['doj'] = recordRow.newData.doj;
    record['mobileNumber'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.mobileNumber);
    record['age'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.age);
    record['address'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY, recordRow.newData.address);
    record['mobile'] = this.EncryptDecrypt.set(HASH_KEY.MY_PRIVATE_KEY,recordRow.newData.mobile);

    this.crudService.UpdateCustomer(recordRow.newData.id, record);
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
      accountType: {
        title: 'Account Type',
        width: '',
        type: 'html',
        class: 'select2-selection select2-selection--single',
        editor: {
          type: 'list',
          config: {
            list: this.accountType,
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
      accountNo: {
        title: 'Account No',
        width: '',
        editable: false,
        addable: false,
      },
      ifscCode: {
        title: 'IFSC Code ',
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
