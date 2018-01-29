import { assert } from 'chai'

describe('DuckDuckGo search', function() {
    it('searches for WebdriverIO', function() {
        browser.url('https://duckduckgo.com/');
        browser.setValue('#search_form_input_homepage', 'WebdriverIO');
        browser.click('#search_button_homepage');
        const title = browser.getTitle();
        assert.equal(title, 'WebdriverIO на DuckDuckGo')
    });

    it('searches for WebdriverIO', function() {
        browser.url('http://localhost:8081');
//        browser.setValue('#search_form_input_homepage', 'WebdriverIO');
//        browser.click('#search_button_homepage');
//
//        var title = browser.getTitle();
//        console.log('Title is: ' + title);
//        assert.equal(title, 'WebdriverIO на DuckDuckGo')
//        // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
    });
});

//describe('DuckDuckGo search', function() {
//  it('searches for WebdriverIO', function () {
//    browser.url('http://0.0.0.0:8888')
//    browser.click('button=Создать новую страницу')
//    const sample = $('div.drag=Комментарии')
////    console.log('sample', sample)
//    const layout = $('div.react-grid-layout')
////    console.log('layout', layout)
//    browser.dragAndDrop('div.drag=Комментарии', 'div.react-grid-layout');
//    browser.waitForEnabled('span.react-resizable-handle', 5000)
//    browser.waitUntil(() => {})
////    browser.setValue('#search_form_input_homepage', 'WebdriverIO')
////    browser.click('#search_button_homepage')
////    const title = browser.getTitle()
////    console.log('Title is: ' + title)
//  })
//})
