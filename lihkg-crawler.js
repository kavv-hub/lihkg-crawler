#!/usr/bin/env node

const program = require('commander');
const { crawlByThread } = require('./lib/crawler');

program.version("1.0.0").description("Lihkg Web Crawler")

program.command("t <thread>")
    .alias("thread")
    .description("Crawl by thread")
    .action(async thread => {
        console.log(JSON.stringify(await crawlByThread(thread)))
        process.exit(1)
    })

program.parse(process.argv)