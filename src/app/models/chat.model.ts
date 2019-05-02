export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
    chatId:string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
}

export class ChatConversations{
    userId: string;
    userName:string;
    toUserName: string;
    toUserId: string;
    chatId:string;
    valoration:number;
    ChatMessage:ChatMessage[];
}