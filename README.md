# pollingappapi
application to add questions and its options with number of votes in each options

Clone project and install dependencies : npm install
install mongodba and robo 3t to view database

To add question in database(Method:POST)
http://127.0.0.1:8000/api/v1/questions/:id/create
example:
      http://127.0.0.1:8000/api/v1/questions/5ea9fdbe64198c39b8f4d719/delete
      
To add option in database(Method:POST)
http://127.0.0.1:8000/api/v1/questions/:id/options/create
example:
      http://127.0.0.1:8000/api/v1/questions/5ea9fdbe64198c39b8f4d719/options/create

To add vote to options(Method:POST)
http://127.0.0.1:8000/api/v1/options/:id/add_vote
example:
      http://127.0.0.1:8000/api/v1/options/5ea9f2894c9c390260c44531/add_vote

To delete question(Method:DELETE)
http://127.0.0.1:8000/api/v1/questions/:id/delete
example:
    http://127.0.0.1:8000/api/v1/questions/5ea9fdbe64198c39b8f4d719/delete
    Note: questions will not delete if any of its options has votes.
    
    
To delete option(Method:Delete)
http://127.0.0.1:8000/api/v1/option/:id/delete
example:
    http://127.0.01:8000/api/v1/option/5ea9ec10cd531930f0d5964c/delete
    Note: if option has vote it will not be deleted

To fetch Question from id(Method:GET)
http://127.0.0.1:8000/api/v1/questions/:id

to fetch all questions
http://127.0.0.1:8000/api/v1/questions/
