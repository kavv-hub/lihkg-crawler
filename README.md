# lihkg-crawler
The goal of lihkg-crawler is to provide a simplier and easier crawling tool to scrape data from Lihkg, a popluar forum in Hong Kong.

## Installation
Register command by executing `sudo npm link` at the root of the repostiroy. After registered, you can be able to access application with `lihkg-crawler` with command. You can find more information by `lihkg-crawler --help` or `lihkg-crawler -h`.

Please make suer your have `node` installed

## Example of Use(s)
Application only support crawled by thread currently.

Crawl by thread: `lihkg-crawler thread <thread>`
```json
{
    "thread_id": "2010222",
    "title": "學生記者被警方質疑「童工」",
    "no_of_reply": "164",
    "no_of_uni_user_reply": "53",
    "like_count": 84,
    "dislike_count": 11,
    "reply_like_count": "116",
    "reply_dislike_count": "25",
    "max_reply_like_count": "54",
    "max_reply_dislike_count": "3",
    "create_time": 1589103050,
    "last_reply_time": 1589111037,
    "max_reply": "5001",
    "total_page": 7,
    "category": "時事台",
    "sub_category": "突發",
    "author": {
        "user_id": "0",
        "nickname": "user",
        "level": "10",
        "gender": "F",
        "status": "1",
        "create_time": 1565372670,
        "level_name": "普通會員"
    },
    "posts": {
        "1": [
            {
                "post_id": "32a7bb05ecf24af7e6e420218411f851634c3284",
                "thread_id": "2010222",
                "user_nickname": "user",
                "user_gender": "F",
                "like_count": "0",
                "dislike_count": "0",
                "vote_score": "0",
                "no_of_quote": "0",
                "remark": [],
                "reply_time": 1589103050,
                "msg": "...",
                "user": {
                    "user_id": "0",
                    "nickname": "user",
                    "level": "10",
                    "gender": "F",
                    "status": "1",
                    "create_time": 1565372670,
                    "level_name": "普通會員"
                }
            }
        ]
    }
}
```
  
**More feature(s) will be coming, hopefully :)**
