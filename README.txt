User story:
The chat cli will use a hidden directory named .chat
The .chat will include a file named prompt.txt
and a directory named responses.

.chat/
├── prompt.txt
└── responses

chat        #starts a file watcher that watches the prompt.txt file
chat --help #prints help info

When the user makes a change to the prompt.txt file, the cli will read the file and use the text in the file to crete a prompt for the openai chat gpt api.

The chat cli will also read the environement variable OPENAI_API_KEY while making requests to the open ai api.
=========================================
Steps
=========================================
────────
Stage 1.
────────
1. Check to see if the .chat directory exists
   - If it does not exist, create it
2. Check to see if the responses directory exists
   - If it does not exist, create it
3. Check to see if the prompt.txt file exists
   - If it does not exist, create it
4. Start a file watcher on the prompt.txt file
5. When the prompt.txt has a change event console.log the prompt ... sending to the api and information about the request 
────────
Stage 2.
────────
1. Figure out which api to use and iterate over the api to find the best response
2. Create a function that will make a request to the openai api
