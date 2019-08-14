export const colors = ['orange', 'pink', 'seafoam', 'purple']

const passLinkById = id => `https://clients.mindbodyonline.com/classic/ws?studioid=4561&stype=41&sTG=${id}`

export const mbolinks = {
  schedule: 'https://clients.mindbodyonline.com/classic/mainclass?studioid=4561',
  passLinkById,
  passes:
    'https://clients.mindbodyonline.com/ASP/main_shop.asp?studioid=4561&tg=22&vt=&lvl=&stype=41&view=&trn=0&page=&catid=&prodid=&date=12%2f27%2f2017&classid=0&prodGroupId=&sSU=&optForwardingLink=&qParam=&justloggedin=&nLgIn=&pMode=1&loc=2',
}
