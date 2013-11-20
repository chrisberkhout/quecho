# Quecho - Query string echo service

This tiny web service will take the query string of any HTTP request and
return it as the response body.

## Where?

It's running at [quecho.herokuapp.com](http://quecho.herokuapp.com?hello,%20world!).

## Why?

I built this to simplify working with an
[API](https://www.twilio.com/docs/quickstart/ruby/rest/initiating-calls)
from [twilio](https://www.twilio.com/), which requires a script for an
outgoing call to be provided in an XML file on the web.

I want to send short alerts, on the fly, from ad-hoc scripts. Using Quecho,
I can avoid having to publish to the web static documents like this:

    <Response>
      <Say>Wake up!</Say>
    <Response>

Instead, I just put it all in a URL and send it off, like this:

    #!/bin/bash

    message='Wake up!'

    encode_x2_py="import sys,urllib;print urllib.quote(urllib.quote(sys.stdin.read().strip()))"
    xml_encoded_x2=$(echo "<Response><Say>$message</Say></Response>" | python -c "$encode_x2_py")

    account_sid='AC00000000000000000000000000000000'
    auth_token='00000000000000000000000000000000'

    from_number='61400000000'
    to_number='61400000000'

    curl -XPOST https://api.twilio.com/2010-04-01/Accounts/$account_sid/Calls.json \
        -u "$account_sid:$auth_token" \
        -d "From=%2B$from_number" \
        -d "To=%2B$to_number" \
        -d "Url=http://quecho.herokuapp.com/?$xml_encoded_x2"

## Run it locally

    git clone https://github.com/chrisberkhout/quecho.git
    cd quecho
    npm start

## Resources

* [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
* [commandlinefu.com: Url Encode](http://www.commandlinefu.com/commands/view/4840/url-encode)

## Who

Chris Berkhout <chrisberkhout@gmail.com> (http://chrisberkhout.com)

