import { Component, OnInit } from '@angular/core';
import { ChatMessage } from './chat-message';
import { ChatbotService } from '../service/chatbot/chatbot.service';
import { ChatMessageFrom } from './chat-message-from';

@Component({
  selector: 'chat-bot',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatbotService]
})
export class ChatComponent implements OnInit {

  messages: ChatMessage[];

  chatMessageFrom: ChatMessageFrom;

  constructor(private chatbot: ChatbotService) {

    this.messages = [<ChatMessage>{
      message: "Welcome to the Tahiti experience. What do you want to know about our wonderful island ?",
      from: ChatMessageFrom.CHAT_MESSAGE_FROM_BOT
    }];

    this.chatMessageFrom = ChatMessageFrom;

  }

  ngOnInit() {

  }

  addMessage(message: String, from = ChatMessageFrom.CHAT_MESSAGE_FROM_USER) {

    if (message) {
      this.messages = [...this.messages, <ChatMessage>{
        from,
        message,
        createdAt: new Date()
      }];

      this.chatbot.ask(message).then((chatMessage: ChatMessage) => {
        this.messages = [...this.messages, chatMessage];
      });

    }
  }

}
