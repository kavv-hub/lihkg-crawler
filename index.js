#!/usr/bin/env node

const program = require('commander');
const { crawlByThread } = require('./src/crawler');

program.version("1.0.0").description("Lihkg Web Crawler")

program.command("t <thread>")
    .alias("thread")
    .description("Crawl by thread")
    .action(thread => {
        crawlByThread(thread)
            .then(content => console.log(JSON.stringify(content)))
            .finally(() => process.exit(1))
    })

program.parse(process.argv)