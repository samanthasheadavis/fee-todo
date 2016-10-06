$(document).ready(function() {
    var todo = {
        remainingTodo: 0,

        // get input from form
        getTodo: function() {

            $('form').submit(function(event) {

                event.preventDefault();
                var todoString = $('.new-todo').val();
                $('.new-todo').val('');
                todo.createTodo(todoString);
                todo.addRemain();


            });
        },

        // build todo (check button, text, delete button)
        createTodo: function(todoString) {
            var todoItem = $('<article>').prependTo('.items');
            var btn = $('<button>').attr('class', 'check').prependTo(todoItem);
            var text = $('<p>').attr('class', 'text').html(todoString).appendTo(todoItem);
            var deleteTodo = $('<button>').attr('class', 'delete').html('X').appendTo(todoItem);
            todo.editTodo(todoString);

        },
        // increment "items left" up or down
        handleRemain: function() {
            $('.incomplete-items').html(todo.remainingTodo);
        },

        addRemain: function() {
          todo.remainingTodo++;
          $('.incomplete-items').html(todo.remainingTodo);

        },

        subtractRemain: function() {
          todo.remainingTodo--;
          $('.incomplete-items').html(todo.remainingTodo);

        },


        editTodo: function(todoString) {
            //trigger function if todo clicked on, dynamically create editableTodo and populate with todoString.
            $('.text').click(function(event) {
                var editableTodo = $("<input>").attr('class', 'newInput').val(todoString);
                $(this).replaceWith(editableTodo); //"this" refers to .text class item clicked on.

            });
        },
        // use event delegation to toggle delete button on hover and assign click event to delete button
        deleteTodo: function() {
            $('main').on('mouseenter mouseleave', 'article', function(event) {
              $(this).children('.delete').toggle();

            });
            $('main').on('click', '.delete', function() {
                $(this).parents('article').remove();
                todo.subtractRemain();
            });

        },

        //checkOff adds the 'checked' class to the article whose check button is being clicked
        checkOff: function() {
          $('main').on('click', '.check', function() {
            $(this).addClass('btnCheck');
            $(this).parents('article').addClass('checked');
            todo.subtractRemain();
          });
        }
    };

    todo.getTodo();
    todo.handleRemain(); // need to trigger in order to count 0 items in the beginning.
    todo.deleteTodo();
    todo.checkOff();
});

// left to do:
// get clear completed button to delete all completed items
// fix bug where completed items that are deleted run deleteTodo twice
// store todo items in an array. could items left just be array.length?

// all the different views stuff
// finicky css stuff
