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
            var saveButton = $("<button>").attr('class', 'saveBtn').appendTo(todoItem).html("Save");
            
        },

        // increment "items left" up or down
        handleRemain: function() {
          var remainingTodo = todo.todoArray.length;
          console.log(remainingTodo);
          $('.incomplete-items').html(remainingTodo);

        },

        addRemain: function(string) {
          var remainingTodo = todo.todoArray.length;
          todo.todoArray.push(string);
          console.log(remainingTodo);
            $('.incomplete-items').html(remainingTodo);

        },

        subtractRemain: function() {
            var remainingTodo = todo.todoArray.length;
            todo.todoArray.splice(todo.todoArray.length-1, 1);
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
                $('.saveBtn').click(function(event) {
                    editString = $(this).siblings('.newInput').val();
                    console.log($(this).siblings('.newInput').val());
                    todo.createTodo(editString);
                    $(this).parents('article').remove();
                });
            });
        },
        // use event delegation to toggle delete button on hover and assign click event to delete button
        deleteTodo: function() {
            $('main').on('mouseover', 'article', function(event) {
                $(this).children('.delete').show();
                $(this).children('.saveBtn').show();


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
// fix multiple todos appearing when one is saved bug (don't call editTodo function inside createTodo function )
// get clear completed button to delete all completed items


// all the different views stuff
// finicky css stuff
