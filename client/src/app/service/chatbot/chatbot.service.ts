import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { ChatMessage } from '../../chat/chat-message';
import { ChatMessageFrom } from '../../chat/chat-message-from';

@Injectable()
export class ChatbotService {
  private chatBotUrl = "http://localhost:3000";
  constructor(private http: Http) {

  }
  ask(question: String): Promise<ChatMessage> {
    const headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers });
    return this.http.post(this.chatBotUrl, JSON.stringify({ask: question}), options)
      .toPromise()
      .then(response => {
        return <ChatMessage>{
          message: response.json().message,
          from: ChatMessageFrom.CHAT_MESSAGE_FROM_BOT,
          createdAt: new Date(),
          type: response.json().type
        }
      })
      .catch(this.handleError)
      ;
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
