/**
 * Created by artyom.grishanov on 21.07.14.
 */
app.Models.User = Backbone.Model.extend({

    defaults: {
        uid: undefined,
        username: '',
        pic190x190: '',
        answer: 0
    },

    init: function() {
        console.log('User init()');
    },

    error: function() {

    },

    answer: function(a) {
        this.set({'answer': 1});
    }

});