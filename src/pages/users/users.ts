import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../../providers/user-provider';
import { ChatViewPage } from '../chat-view/chat-view';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

    users:Observable<any[]>;
    uid:string;
    constructor(public nav: NavController, public userProvider: UserProvider) {
      this.userProvider.getUid()
        .then(uid => {
            this.uid = uid;
            this.users = this.userProvider.getAllUsers();
        });
    }
    
    openChat(key) {
        let param = {uid: this.uid, interlocutor: key};
        this.nav.push(ChatViewPage,param);
    }

}
