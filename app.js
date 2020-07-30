
const express = require('express');
const app = express();
const got = require('got');
const bodyParser = require('body-parser');

// midleware
app.use("/assets", express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.set('view engine', 'pug');


const getLinkSD = (link) => {
    return got(link).then(res => {

        const link = res.body.split('sd_src:"')[1].split('",hd_tag')[0];
        return {
            url: link
        };
    }).catch(error => {
        if (error) {
            error.message = 'Lỗi !';
        }
        return error.message;
    })
}
const getLinkHD = (link) => {
    return got(link).then(res => {

        const link = res.body.split('hd_src:"')[1].split('",sd_src:"')[0];
        return {
            url: link
        };
    }).catch(error => {
        if (error) {
            error.message = 'Lỗi !';
        }
        return error.message;
    })
}

// getLinkSD(link).then(el => console.log('link SD>>>>>', el))

// getLinkHD(link).then(el => console.log('link HD>>>>>', el))



/** Routes */
app.get('/', (req, res) => {
    res.render('index', {
        title: "Download Video Facebook"
    })
})

app.post('/get-link', async (req, res) => {
    const {linkVideo} = req.body;
    let linkDownload;
    await getLinkSD(linkVideo).then(el => linkDownload = el)
    res.json(linkDownload.url);
})

app.listen(3000, () => console.log('Server is running !!!!'))
