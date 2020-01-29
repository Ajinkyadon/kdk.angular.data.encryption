import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//routing related
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import { HomeModule } from './home/home.module';
import { FormsModule } from '@angular/forms';
//firebase authintation 
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

//import firestore configuration
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { CRYPT_CONFIG_PROVIDER, CryptConfigProvider, EncryptionService, EncryptionServiceModule } from 'angular-encryption-service';

const AppCryptConfigProvider: CryptConfigProvider = {
  getSalt(): Promise<string> {
    // TODO: implement providing a salt, which should be unique per user and
    // base64-encoded.
    return Promise.resolve('saltsalt');
  }
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    EncryptionServiceModule.forRoot()
  ],
  providers: [    {provide: CRYPT_CONFIG_PROVIDER, useValue: AppCryptConfigProvider}  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


