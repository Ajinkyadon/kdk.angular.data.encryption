import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/firebaseauth/auth.service';
import { FormBuilder } from '@angular/forms';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  userComplaints:any;
  userComplaintHistory:any;
  constructor( public auth: AuthService, private crudService: ComplaintsService , private fb: FormBuilder) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-purple sidebar-mini';

    this.crudService.ReadComplaints().subscribe(data => {
 
      this.userComplaints = data.map(e => {
        return { 
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          summary: e.payload.doc.data()['summary'],
          usertype: e.payload.doc.data()['usertype'],
          status: e.payload.doc.data()['status'],
          mobileNumber: e.payload.doc.data()['mobileNumber'],
        };
      })
      console.log(this.userComplaints);
 
    });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

  settings = {
    mode: 'inline', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions             ',
      add: true,
      edit: true,
      delete: false,
      
      custom: [
         {
            name: 'viewHistory',
            title: '<i class=" btn btn-social-icon  btn-xs btn-default" title="View complaint history"> <i class="fa fa-history"></i></i>',
          }
          // {
          //   name: 'followUp',
          //   title: '<i class=" btn btn-social-icon btn-warning"> <i class="glyphicon glyphicon-th-list"></i></i>',
          // },

      ],
      position: 'left', // left|right
    },
   attr:{
    class:'table table-bordered table-striped'
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
      // email: {
      //   title: 'Email',
      //   type:'',
      //   width:'250px',
      //   editable:'true',
      //   class:'',
      //   onComponentInitFunction:'', 
      // },
      id : {
        title: 'Complaint ID',
        width:'120px',
        editable:false, 
        addable:false  
      },
      mobileNumber: {
        title: 'Mobile no',
        width:'110px',
        editable:false,
       
      },
      title: {
        title: 'Title',
        width:'110px',
        editable:false,
       
      },
      usertype: {
        title: 'User Type',
        width:'60px',
        type: 'html',
        editable:false,
        editor: {
          type: 'list',
          config: {
            list: 
            [
              { value:'customers' ,title:'customers' },
              { value:'drivers' ,title:'drivers' }
            ],
          },
        }
      },
      
      status: {
        title: 'isResolved',
        width:'80px',
        editable:true,
        editor: {
          type: 'list',
          config: {
            list: 
            [
              { value:'Yes' ,title:'Yes' },
              { value:'No' ,title:'No' }
            ],
          },
        }
       
      },
      summary: {
        title: 'Summary',
        editable:true,
       
      },
    },
    pager: {
      display: true,
      perPage: 6,
    },
    editor:{
      config:{ 
          value: 'Element Value',
          title: 'Element Title' 
      }
    }
  };


  SaveComplaint(recordRow){
    console.log("SaveComplaint---->",recordRow);
    this.crudService.CreateComplaint(recordRow.newData);
    
  }
  UpdateComplaintHistory(recordRow){
    let myDateTemp = new Date();
    let Historyrecord = {
      timestamp: myDateTemp,
        summary: recordRow.data.summary,
     }
    this.crudService.SetComplaintHistory(recordRow.data.id, Historyrecord); 
    console.log("UpdateEmployee---->",recordRow);
    
    this.crudService.UpdateComplaint(recordRow.newData.id, recordRow.newData); 

  }
  onCustomAction(event) {
    switch ( event.action) {
      case 'viewHistory':
        this.viewHistory(event.data);
          break;
    //  case 'followUp':
    //     this.FollowUp(event.data);
    }
  }

public viewHistory(data) {
  console.log('view hstory ',data);
  this.crudService.viewComplaintHistory(data.id).subscribe(data => {
    this.userComplaintHistory='';
    this.userComplaintHistory = data.map(e => {
      console.log('timestamp1', e.payload.doc.data()['timestamp']);
      return { 
        timestamp: new Date(e.payload.doc.data()['timestamp']['seconds']*1000) ,
        summary: e.payload.doc.data()['summary'],
      };
    })
    console.log('viewComplaintHistory',this.userComplaintHistory);
    console.log('timestamp',this.userComplaintHistory.timestamp);
  });
  }
  public FollowUp(formData: any) {
    // this.modalRef = this.modalService.open(ViewProfileComponent);
    // this.modalRef.componentInstance.formData = formData;
    // this.modalRef.result.then((result) => {
    //   if (result === 'success') {
    //     this.loadData();
    //   }
    // }, (reason) => {
    // });
  }

}
 