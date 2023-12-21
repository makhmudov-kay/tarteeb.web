export interface Message{
    id: string,
    content: string,
    isSent: boolean,
    sentDate: Date,
    messageType: MessageType,
    messageService: MessageProvider,
    ClientId: string,
}

export enum MessageType
{
    Attendence,
    Score,
    Invoice,
}

export enum MessageProvider
{
    Telegram,
    Sms,
    Email
}