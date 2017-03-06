import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ChatsProvider } from '../../providers/chats-provider';
import { UserProvider } from '../../providers/user-provider';

/*
  Generated class for the ChatView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat-view',
  templateUrl: 'chat-view.html'
})
export class ChatViewPage {
  message: string;
  uid: string;
  interlocutor: string;
  chats: FirebaseListObservable<any>;
  @ViewChild(Content) content: Content;
  constructor(public nav: NavController,
    params: NavParams,
    public chatsProvider: ChatsProvider,
    public af: AngularFire,
    public userProvider: UserProvider) {

    this.uid = params.data.uid;
    this.interlocutor = params.data.interlocutor;

    // Get Chat Reference
    chatsProvider.getChatRef(this.uid, this.interlocutor)
      .then((chatRef: any) => {
        this.chats = this.af.database.list(chatRef);
      });
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }


  sendMessage() {
    if (this.message) {
      let chat = {
        from: this.uid,
        message: this.message,
        type: 'message'
      };
      this.chats.push(chat);
      this.message = "";
    }
  };

  sendPicture() {
    let chat = { from: this.uid, type: 'picture', picture: null };
    this.userProvider.getPicture()
      .then((image) => {
        chat.picture = image;
        this.chats.push(chat);
      });
  }

}
