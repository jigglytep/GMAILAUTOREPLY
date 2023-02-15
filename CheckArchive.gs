function checkArchive() {
  const q = GmailApp.search(`label:[mailbox]/jobs is:unread`);
  console.log(q.length);
  q.forEach((element) => {element.moveToInbox();})
}
