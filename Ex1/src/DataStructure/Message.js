class Message {
  constructor( author, msg, isread ) {
    this.author = author;
    this.msg = msg;
    this.isread = isread;
    const date = new Date();
    this.sentDate = date;
  }
}

export default Message;
