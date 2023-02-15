//name of label to organize autoreplied emails under
let LABEL = "[Mailbox]/JOBS"

//Necessary Files
let RESUME_DOCX = '<RESUME.docx>'; //name of file in google drive
let RESUME_PDF = '<RESUME.pdf>'; //name of file in google drive
let EMAIL_TRACKER = '<NAME_OF_GOOGLE_SHEET>'; //name of google sheet

//EMAIL BODY
let EMAIL_BODY = `
    Thank you for contacting me regarding this opportunity, please see my latest resume attached, in addition please see the answer to most common questions recruiters have asked me in the past. 
    While this is an auto reply It is designed to save your time and mine, I hope you find it useful. Please review my requirements and latest resume below before contacting me further

I am only considering 100% remote roles at this time, please see my basic information below:

Python backend and automation developer with 7 years of experience.

Salary Requirements: $125,000($62/hour) - $250,000($125) Depending on position
Work/Visa Status:<personal data>
Full Name:<personal data>
Phone: <personal data>
Willing to relocate: <personal data>
Best Email: <personal data>
Current Location:<personal data>
Face2Face (yes/no): <personal data>
Availability to Interview: <personal data>
Availability to Start:<personal data>
Are you currently working : <personal data>
LinkedIn profile :<personal data>

Best way to contact me is via text message at<personal data>

Regards.

<personal data>
<personal data> `;

function myFunction() {

  var body =  EMAIL_BODY
  var filename_docx = RESUME_DOCX;
  var filename_pdf = RESUME_PDF;
  
  //get resumes from gDrive
  var resume_docx = DriveApp.getFilesByName(filename_docx);
  var resume_pdf = DriveApp.getFilesByName(filename_pdf);
  
  if (!resume_docx.hasNext()){
    console.error("Could not open file "+filename);
    return;
  }
  if (!resume_pdf.hasNext()){
    console.error("Could not open file "+filename);
    return;
  }

  // Get Label
  var label = GmailApp.getUserLabelByName("[Mailbox]/JOBS");
  var inbox_label = GmailApp.getUserLabelByName("Inbox");

  const pdf = resume_pdf.next().getAs(MimeType.PDF);
  const docx = resume_docx.next().getAs(MimeType.MICROSOFT_WORD);

  //FIND Emails that are probably from recruiters
  const q = GmailApp.search(
  `{subject:python 
    subject:remote 
    subject:AWS
    subject:developer
    subject:Urgent
    subject:Hiring
    subject:Backend
    subject:senior       
    subject:job  
    subject:engineer 
    subject:java 
    subject:aws 
    subject:tester 
    subject:automation 
    subject:requirement 
    subject:Recruiting 
    subject:NET 
    subject:fulltime 
    subject:Job
    subject:Opportunity
    subject:Project
    subject:Manager
    subject:"ETL" 
    subject:"QA" 
  } 
  is:unread 
  in:inbox 
  -subject:"re:"  
  -subject:RTR
  -from:noreply@redditmail.com 
  -from:*@necsd.net
  -from:*@gmail.com
  -from:*@yahoo.com  
  -from:*@mailinglists.com  
  -from:*@linkedin.com`);

  console.log(q.length);

  
  q.forEach((element) => {
  
      //Send Reply
      element.reply( 
        body, 
        {
          attachments:[pdf, docx]
        }
      ).markRead()

      //Apply label and move to archive
      label.addToThread(element);
      element.moveToArchive();
      
      //Create a record of conversation in sheets, 
      //not required feel free to commentout
      save2Sheets(element.getMessages()[0].getFrom());
    }
  )//forEach
} //function myFunction() 


function save2Sheets(Email) {

  var filename_sheets= EMAIL_TRACKER;
  
  //Get SpreadSheet and all of it's values in active sheet
  var sheets = DriveApp.getFilesByName(filename_sheets);
  var spreadSheet = SpreadsheetApp.open(sheets.next());
  var sheet = spreadSheet.getSheets()[0];
  var data = sheet.getDataRange().getValues();

  function findExisting(row) {
    return row[0] === Email;
  }

  //check if email is in spread sheet.
  var index1 = data.findIndex(findExisting);

  //Update or Create new entry
  if (index1 != -1){
    var index = parseInt(index1);
    console.log('index = ' + index);
    console.log('data = ' + data[index]);
    range = sheet.getRange(`B${index+1}`)
    range.setValue(data[index][1]+1);
  }else{
    sheet.appendRow([Email, 1]);
  }
}




