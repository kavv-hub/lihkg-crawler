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
            thread_data = pickBasicProperty(json.response)
        }
        // store posts
        thread_data.posts[current_page] = json['response']['item_data']
        
        // move to next page
        current_page = parseInt(json['response']['page']) + 1
        total_page = json['response']['total_page']
    }

    return thread_data
}

function pickBasicProperty(response) { 
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
            category,
            sub_category,
            author: user,
            posts: {}
        }))(response)
}

module.exports = { crawlByThread }