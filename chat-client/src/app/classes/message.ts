export class Message {
    type: string;
    text: string;
    user_id: string;
    date: string;

    constructor(text: string, user_id: string) {
        this.type = 'msg';
        this.text = text;
        this.user_id = user_id;
        this.date = new Date().toUTCString();
    }
}

export class WelcomeMessage extends Message{
    constructor() {
        super('', '');
        this.type = 'welcome';
    }
}

export class NewUserMessage extends Message{
    constructor(user_name: string) {
        super(user_name, '');
        this.type = 'new';
    }
}

export class DisconnectedUserMessage extends Message{
    constructor(user_name: string) {
        super(user_name, '');
        this.type = 'disconnected';
    }
}

