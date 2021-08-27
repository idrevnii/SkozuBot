# About the project

This is a bot created for the Skozu19 conference. The bot can generate humoresques from public sites and tell you when the Sabbath is coming.

# Installation

1. Get a free Bot Token from BotFather in Telegram
2. Install Redis
3. Clone the repo
   `git clone https://github.com/idrevnii/SkozuBot`
4. Insall NPM packages
   `npm install`
5. Create in root directory .env file with field `BOT_TOKEN` and assign your token from BotFather

**Note: Bot uses standart redis host and port**

# Usage

## Commands

- `/humoresque` or `/humoresque@Skozu19_bot`(in conference) - generate random glued humoresques from a public joke site. You can specify how many percent to take from the first humoresque and how much from the second humoresque. For example: `/humoresque 40 60` will form a glued humoresque with 40% part from the first humoresque and 60% part from the second humoresque.
- `/shabbat` or `/shabbat@Skozu19_bot` - tells you how close the Sabbath is.
- `/demotivator` or `/demotivator@Skozu19_bot` - creates a demotivator, you can add a bottom line by passing the string after the command. This command must be triggered by a response to another message
