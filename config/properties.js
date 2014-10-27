/**
 * Created by artyom.grishanov on 16.10.14.
 */

module.exports = {

    pages: {
        indexPage : 'index',
        companyPage : 'company',
        servicesPage : 'services',
        blogPage : 'blog',
        contactsPage : 'contacts',
        pageLogin: 'login',
        pageSignUp: 'signup',
        profilePage: 'profile'
    },

    port: '3333',

    root: ((process.env.PRODUCTION) ? 'https://afternoon-anchorage-4984.herokuapp.com/': 'http://localhost:3333/')

};
