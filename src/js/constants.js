export const colors = ['orange', 'pink', 'seafoam', 'purple']

const passLinkById = id => `https://clients.mindbodyonline.com/classic/ws?studioid=4561&stype=41&sTG=${id}`

export const mbolinks = {
	schedule: 'https://clients.mindbodyonline.com/classic/mainclass?studioid=4561',
	passLinkById,
}
