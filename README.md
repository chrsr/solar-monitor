# Solar Monitor Bulb

AWS Lambda and step function scripts to enable you to simply monitor your solar sytem with a smart light bulb.

Full story can be found here: https://medium.com/p/97b2735e48aa

# Quick setup

- Create three new AWS lambda functions using each `.js` file
- Configure environment variables for each corresponding `process.env.*` values listed in each function
- Create a new AWS state machine using `statemachine.json`
- Replace each `ARN` value with the equivalent Lambda ARN IDs (i.e. `1_LAMBDA_ARN` replaced with `arn:aws:lambda:us-west-2:1234567890:function:1_SolarEdgeTime`)
- Congfigure 2 x IFTTT.com webhooks for turning on/off your smart bulb (of choice)