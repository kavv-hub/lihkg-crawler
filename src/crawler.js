const puppeteer = require('puppeteer');


async function crawlByThread(thread) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    let [current_page, total_page] = [1, 1]
    let thread_data = {}
    while (current_page <= total_page) {
        await page.goto(`https://lihkg.com/thread/${thread}/page/${current_page}`);
        const json = await page.waitForResponse(response => response.url().startsWith(`https://lihkg.com/api_v2/thread/${thread}/page`)).then(response => response.json())
        // evaluate if page is exist
        if (json['error_code']) {
            throw new ValueError(json['error_message'])
        }
        // if no error found, add to json 
        if (current_page === 1) {
            // pick basic property
            thread_data = pickThreadProperty(json.response)
        }
        // store posts
        thread_data.posts[current_page] = json['response']['item_data'].map(post => pickPostProperty(post))
        
        // move to next page
        current_page = parseInt(json['response']['page']) + 1
        total_page = json['response']['total_page']
    }

    return thread_data
}

function pickThreadProperty(response) { 
    return (({
            thread_id, 
            title, 
            no_of_reply, 
            no_of_uni_user_reply,
            like_count, 
            dislike_count,
            reply_like_count,
            reply_dislike_count,
            max_reply_like_count,
            max_reply_dislike_count,
            create_time,
            last_reply_time,
            max_reply,
            total_page,
            category,
            sub_category,
            user
        }) => ({
            thread_id, 
            title, 
            no_of_reply, 
            no_of_uni_user_reply,
            like_count, 
            dislike_count,
            reply_like_count,
            reply_dislike_count,
            max_reply_like_count,
            max_reply_dislike_count,
            create_time,
            last_reply_time,
            max_reply,
            total_page,
            category: category.name,
            sub_category: sub_category ? sub_category.name : null,
            author: pickUserProperty(user),
            posts: {}
        })
    )(response)
}

function pickPostProperty(post) {
    return (({ post_id, 
            thread_id, 
            user_nickname, 
            user_gender, 
            like_count, 
            dislike_count, 
            vote_score, 
            no_of_quote, 
            remark, 
            reply_time, 
            msg, 
            user 
        }) => ({ 
            post_id, 
            thread_id, 
            user_nickname, 
            user_gender, 
            like_count, 
            dislike_count, 
            vote_score, 
            no_of_quote, 
            remark, 
            reply_time, 
            msg, 
            user: pickUserProperty(user)
        })
    )(post)
}

function pickUserProperty(user) {
    return (({ 
            user_id, 
            nickname, 
            level, 
            gender, 
            status, 
            create_time, 
            level_name 
        }) =>({ 
            user_id, 
            nickname, 
            level, 
            gender, 
            status, 
            create_time, 
            level_name
        })
    )(user)
}

module.exports = { crawlByThread }