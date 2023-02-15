# GMAILAUTOREPLY

I set up a script using google apps script to:
- Auto replied to initial job recruiter's email, with my resume as an attachment
 - checked a google sheet if I emailed the individual already
  - if I didn't added them to the list with a count of 1
  - ELSE incremented the count by 1
- added a "JOBS" label to the conversation
- Archived the conversation
- Checked to see if there were unread emails in the conversations with JOBS label
 - if there are move them to the inbox
 
 
 To set this up first create a "JOBS" labe in gmail or in 'Code.gs' change: 
 line:https://github.com/jigglytep/GMAILAUTOREPLY/blob/dfc2282dbd9e6359e2a2637ebeebe60d10373d22/Code.gs#L2 
  To the name of the labe you wish to use.
 
 In 'Code.gs' change lines 5-7 to match the name of your resume in Google Drive and the name of the Google Sheet you wish use. The Google Sheets is opetional but this is where you would keep track of whom you emailed and how many times. 
 ![image](https://user-images.githubusercontent.com/14004931/218929661-3f4ee692-9e7a-4d2d-8a02-7328da5b4059.png)


Go to scripts.google.com and create a new project.
Copy and paste contents of Code.gs into the file create by google:
![image](https://user-images.githubusercontent.com/14004931/218930171-f948d099-e8a4-467d-81f7-64dc71357e03.png)

Click the Plus button at the top of the column to create a new file. Name it 'CheckArchive.gs' and copy and paste the contents into it (it should look something like):
![image](https://user-images.githubusercontent.com/14004931/218930595-20dc5031-fd6d-44bf-b80e-c02e05148879.png)

Click on the Triggers link:
![image](https://user-images.githubusercontent.com/14004931/218930727-dbc6c466-c57e-402b-9719-b7b97a09e0dc.png)

Clion the Add Trigger button, the following settings worked for me:
![image](https://user-images.githubusercontent.com/14004931/218930961-4677fb29-4c61-4f84-85cf-6f45b9050dc9.png)

Repeat steps above but this time create a trigger for the checkArchive function:
![image](https://user-images.githubusercontent.com/14004931/218931339-0a36c9bf-bc95-46b6-9762-befca19f47ae.png)

This should be enough to get things going.
