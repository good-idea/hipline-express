const sm = require('sitemap')
const axios = require('axios')
const { cms } = require('../config')

const buildSitemap = (req, res) => {
  axios.get(`${cms.apiRoot}/initial`).then((response) => {
    const { home, classes, infoPages, sourcePasses } = response.data
    const homepageUrl = { url: '/', changeFreq: 'weekly', lastmodISO: home.lastModified, priority: 0.8 }
    const classesUrl = { url: '/classes', changeFreq: 'weekly', lastModISO: classes.lastModified, priority: 0.8 }
    const pricingUrl = { url: '/passes', changeFreq: 'weekly', lastModISO: sourcePasses.lastModified, priority: 0.8 }
    const infoPageUrls = infoPages
      .filter((page) => page.isVisible)
      .map((page) => ({
        url: `/${page.slug}`,
        changeFreq: 'weekly',
        lastModISO: page.lastModified,
        priority: 0.7,
      }))

    const sitemap = sm.createSitemap({
      hostname: 'https://www.myhipline.com',
      cacheTime: 600000, // 600 sec - cache purge period
      urls: [
        //
        homepageUrl,
        classesUrl,
        pricingUrl,
        ...infoPageUrls,
      ].filter(Boolean),
    })

    return sitemap.toXML((err, xml) => {
      if (err) {
        console.log(err)
        return res.status(500).end()
      }
      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  })
}

module.exports = buildSitemap
