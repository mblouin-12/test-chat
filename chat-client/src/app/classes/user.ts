import * as uuid from 'uuid';

export class User {
    id: string;
    name: string;
    connected: boolean;

    constructor(name: string) {
        this.id = uuid.v4(); // generate unique id
        this.name = name;
        this.connected = true;
    }
}
