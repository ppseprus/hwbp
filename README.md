# Have We Been Pwned?

A Node.js tool to check email addresses and their plus aliases against haveibeenpwned.com.

## Why?

> Some people choose to create accounts using a pattern known as "plus aliasing" in their email addresses. [..] There is presently a UserVoice suggestion requesting support of this pattern in HIBP. However, as explained in that suggestion, usage of plus aliasing is extremely rare, appearing in approximately only 0.03% of addresses loaded into HIBP. [..]

According to HIBP's FAQ, I'm part of that 0.03% community. : )

Unfortunately, this means that if one has an account with 4 aliases, 5 email addresses have to be signed up for notifications on the site. And I'm a notorious user of aliases...

## Why else?

While the original reason was to check up on my aliases, during development I realised that there are people around me who don't care about privacy as much as I do. Often they would not even know how to do so. Grandparents are usually too computer-illiterate to handle such matters. And in general, it is a less accessible topic. For now at least.

So, I thought I would keep an eye out for grandma's account too. And it is much easier to check her email address through the API rather than to let her freak out when HIBP notifies her about a breach.

## How to use

1. Add your accounts to the _accounts.json_ (see the _example.json_ for help)
2. Run `npm start` or `node hwbp --verbose` for _verbose_ mode

**If and when something happens, keep calm and notify your family members you watch out for! Tell them what to do!**

How simple is that?

And the output is made pretty by [chalk](https://github.com/chalk/chalk). Look!

![The tool in action](https://raw.githubusercontent.com/ppseprus/hwbp/master/images/hwbp.gif?raw=true)

## Disclaimer

Well, it is what it is. Nothing more, nothing less.
