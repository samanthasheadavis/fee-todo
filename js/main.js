$(document).ready(function() {
    var todo = {
        todoArray: [],

        // get input from form
        getTodo: function() {

            $('form').submit(function(event) {

                event.preventDefault();
                var todoString = $('.new-todo').val();
                $('.new-todo').val('');

                todo.createTodo(todoString);
                todo.addRemain(todoString);
                console.log(todo.todoArray);
            });
        },

        // build todo (check button, text, delete button)
        createTodo: function(todoString) {
            var todoItem = $('<article>').prependTo('.items');
            var btn = $('<button>').attr('class', 'check').appendTo(todoItem);
            var text = $('<p>').attr('class', 'text').html(todoString).appendTo(todoItem);
            var deleteTodo = $('<button>').attr('class', 'delete').html('X').appendTo(todoItem);
            todo.editTodo(todoString);
        },

        // increment "items left" up or down

        addRemain: function(string) {
            console.log('array length is: ' + todo.todoArray.length + 1);
            var remainingTodo = todo.todoArray.length + 1;
            todo.todoArray.push(string);
            console.log("remainingTodo: " + remainingTodo);
            $('.incomplete-items').html(remainingTodo);
        },

        subtractRemain: function() {
            var remainingTodo = todo.todoArray.length - 1;
            todo.todoArray.splice(todo.todoArray.length - 1, 1);
            console.log(remainingTodo);
            console.log(todo.todoArray);
            $('.incomplete-items').html(remainingTodo);
        },

        editTodo: function(todoString) {
            //trigger function if todo clicked on, dynamically create editableTodo and populate with todoString.
            var textbox = $('.text');
            var editString = todoString;
            var editableTodo = $("<input>").attr('class', 'newInput').val(editString);

            $('.text').click(function(event) {

                $(this).replaceWith(editableTodo); //"this" refers to .text class item clicked on.
            });

            $(editableTodo).keyup(function(e) {
              var value = this.value;
              if (e.keyCode == 13) {
                  console.log(value);
                  todo.createTodo(value);
                  $(this).parents('article').remove();
              }
            });

        },
        // use event delegation to toggle delete button on hover and assign click event to delete button
        deleteTodo: function() {
            $('main').on('mouseover', 'article', function(event) {
                $(this).children('.delete').show();
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
    todo.deleteTodo();
    todo.checkOff();

});

// BUGS:
// make delete button stay in line
// get x button to hover correctly
// get clear completed button to delete all completed items


// all the different views stuff
// finicky css stuff
