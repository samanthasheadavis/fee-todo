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

            });
        },

        // build todo (check button, text, delete button)
        createTodo: function(todoString) {
            var todoItem = $('<article>').prependTo('.items');
            var btn = $('<button>').attr('class', 'check').prependTo(todoItem);
            var text = $('<p>').attr('class', 'text').html(todoString).appendTo(todoItem);
            var deleteTodo = $('<button>').attr('class', 'delete').html('X').appendTo(todoItem);
            todo.handleRemain();
            todo.editTodo(todoString);

        },
        // increment "items left" up or down
        handleRemain: function() {
            $('.incomplete-items').html(todo.remainingTodo);
            todo.remainingTodo++;
        },

        editTodo: function(todoString) {
            //trigger function if todo clicked on, dynamically create editableTodo and populate with todoString.
            $('.text').click(function(event) {
                console.log("The paragraph was clicked.");
                var editableTodo = $("<input>").val(todoString);
            $(this).replaceWith(editableTodo); //"this" refers to .text class item clicked on.
            //save new todo text and when input button submitted, replace with old <p> text class containing updated todo
            $('input').submit(function(event) {
              todoString = $('input').val();
              console.log(todoString);
            });
            });
        }
    };

    todo.getTodo();
    todo.handleRemain(); // need to trigger in order to count 0 items in the beginning.
});
