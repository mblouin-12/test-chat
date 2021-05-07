export class Message {
    type: string;
    text: string;
    user_id: string;
    date: string;

    constructor(text: string, user_id: string, type?: string) {
        if (type) {
            this.type = type;
        } else {
            this.type = 'msg';
        }
        this.text = text;
        this.user_id = user_id;
        this.date = new Date().toUTCString();
    }
}