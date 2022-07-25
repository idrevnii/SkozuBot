# About the project

The bot is written with grammyjs and created for the Skozu19 conference. Bot can create random jokes display the current exchange rate and remind you when the next Sabbath.

# Installation

1. Get a free Bot Token from BotFather in Telegram
2. Clone the repo
   `git clone https://github.com/idrevnii/SkozuBot`
3. Create in root directory .env file with field `BOT_TOKEN` and assign your token from BotFather   
4. Install NPM packages `npm install` or `yarn`
5. Run the bot `npm start` or `yarn start`

OR

4. Run `docker-compose up` if you want to use Docker.


# Usage

## Commands

-   `/currency` or `/currency@Skozu19_bot` - get the current exchange rate of USD/RUB, EUR/RUB, CNY/RUB, BTC/USD, ETH/USD, USDT/RUB
-   `/humoresque` or `/humoresque@Skozu19_bot`(in conference) - generate random glued humoresques from a public joke site. You can specify how many percent to take from the first humoresque and how much from the second humoresque. For example: `/humoresque 40 60` will form a glued humoresque with 40% part from the first humoresque and 60% part from the second humoresque.
-   `/shabbat` or `/shabbat@Skozu19_bot` - tells you how close the Sabbath is.
-   `/demotivator` or `/demotivator@Skozu19_bot` - creates a demotivator, you can add a bottom line by passing the string after the command. This command must be triggered by a response to another message
