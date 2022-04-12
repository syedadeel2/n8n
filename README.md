# n8n-nodes-gemini

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

I have designed Gemini node for my personal use to automate my withdrawal workflow and thought, why not share it with the world.

This node is very simple; it uses the Gemini Exchange REST API to make the call and returns the response. I have listed all the endpoints in a dropbox for easy selection.

**Please note that if you get a 400 error, please make sure you have the relevant permission to API Key or check your payload. By default, this node sends the payload.**

```
{
    "nonce": <nonce>,
    "request": "<endpoint>"
}
```

And anything additional you need to send, I have exposed the Payload field on node UI, which will get merged into the above object.

Please feel free to open the issue if you find any.


# Installation

if you are using docker then do the bash to the container and run the following command to install the node.

````
cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-gemini
````

Or wherever you are running n8n, make sure to go to its installation directory, where you can see the n8n folder and run the following command.

```
npm install n8n-nodes-gemini
```

DO NOT FORGET TO RESTART THE n8n AFTER INSTALLATION.

