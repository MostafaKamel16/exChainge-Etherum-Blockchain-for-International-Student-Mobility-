# Mobility Blockchain Backend

Backend for the SEBA Lab blockchain project.

# How to start up the REST API
Fetch the config
    
    Copy the config.js from the story: https://gitlab.lrz.de/student-mobility-seba/mobility-blockchain-backend/-/issues/4
    and add it to the directory ./express/src/

Build

    $ npm install

Run

    $ cd express
    $ npm start

# API Endpoints
1. Create new User


    POST http://localhost:4003/user/create
   
     Payload:
     {
     "username": "test-6",
     "metamask_address": "random"
     }

     Response: 201 Created
     {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
     "username": "test-6",
     "metamask_address": "random",
     "nonce": "7601"
     }


2. User login


    POST http://localhost:4003/user/login
   
    Payload:
    {
    "username": "test-6",
    "metamask_address": "random"
    "sign": "random_sign"
    }
   
    Response: 200 OK
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "username": "test-6",
    "metamask_address": "random",
    "nonce": "7601"
    }
   

3. Read Nonce

    
    GET http://localhost:4003/user/nonce/metamask_address
   
    Response: 200 OK
    3532
   

4. Create Transcript 


    POST http://localhost:4003/transcript/create
    
    Payload:
    {
       "sending_university_username": "test-3",
       "receiving_university_username": "test-user",
       "semester": "WIN2021_22",
       "university": "TUM",
       "student_id": "ge45mnd",
       "subject_grades": [{
            "subject_name": "SEBA Lab",
            "subject_code": "IN2031",
            "grade": "4,3",
            "passing_status": "FAILED"
       }]
    }
   

5. Get Sent Transcripts by university's username

    
    GET http://localhost:4003/transcript/sending_university/test-3

    Response: 200 OK
    [
       {
       "_id": "61ae64c858d2810d780db43f",
       "sending_university_username": "test-3",
       "receiving_university_username": "test-user",
       "semester": "WIN2021_22",
       "university": "TUM",
       "student_id": "ge45mnd",
       "subject_grades": [
           {
           "_id": "61ae64c858d2810d780db440",
           "subject_name": "SEBA Lab",
           "subject_code": "IN2031",
           "grade": "4,3",
           "passing_status": "FAILED"
           }
       ],
       "__v": 0
       }
    ]


6. Get Received Transcripts by university's username


    GET http://localhost:4003/transcript/receiving_university/test-user

    Response: 200 OK
    [
    {
    "_id": "61ae64c858d2810d780db43f",
    "sending_university_username": "test-3",
    "receiving_university_username": "test-user",
    "semester": "WIN2021_22",
    "university": "TUM",
    "student_id": "ge45mnd",
    "subject_grades": [
         {
         "_id": "61ae64c858d2810d780db440",
         "subject_name": "SEBA Lab",
         "subject_code": "IN2031",
         "grade": "4,3",
         "passing_status": "FAILED"
         }
    ],
    "__v": 0
    }
    ]
   

7. Get Transcript by ID


    GET http://localhost:4003/transcript/61a9119a7244f4165353c844
    Response: 200 OK
    {
    "_id": "61a9119a7244f4165353c844",
    "sending_university_username": "test-3",
    "receiving_university_username": "test-user",
    "semester": "WIN2021_22",
    "university": "TUM",
    "student_id": "ge45mnd",
    "subject_grades": [
        {
        "_id": "61ae64c858d2810d780db440",
        "subject_name": "SEBA Lab",
        "subject_code": "IN2031",
        "grade": "4,3",
        "passing_status": "FAILED"
        }
    ],
    "__v": 0
    }