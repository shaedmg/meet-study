export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
    conversationId:string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
}

export class ChatConversations{
    userId: string;
    toUserId: string;
}