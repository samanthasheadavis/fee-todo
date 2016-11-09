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
            });
        },

        // build todo (check button, text, delete button)
        createTodo: function(todoString) {
            var todoItem = $('<article>').attr('class', 'active').prependTo('.items');
            var btn = $('<button>').attr('class', 'checkbox').html("<span>&#10003</span>").appendTo(todoItem);
            var text = $('<p>').attr('class', 'text').html(todoString).appendTo(todoItem);
            var deleteTodo = $('<button>').attr('class', 'delete').html('X').appendTo(todoItem);
            todo.editTodo(todoString);
        },

        // increment "items left" up or down
        addRemain: function(string) {
            var remainingTodo = todo.todoArray.length + 1;
            todo.todoArray.push(string);
            $('.incomplete-items').html(remainingTodo);
        },

        subtractRemain: function() {
            var remainingTodo = todo.todoArray.length - 1;
            todo.todoArray.splice(todo.todoArray.length - 1, 1);
            $('.incomplete-items').html(remainingTodo);
            if (remainingTodo < 0) {
              remainingTodo = 0;
            }
        },

        //trigger function if todo clicked on, dynamically create editableTodo and populate with todoString.
        editTodo: function(todoString) {
            var textbox = $('.text');
            var editString = todoString;
            var editableTodo = $("<input>").attr('class', 'newInput').val(editString);

            $('.text').click(function(event) {
                $(this).parents('article').addClass('clickborder');
                $(this).replaceWith(editableTodo); //"this" refers to .text class item clicked on.
            });

            $(editableTodo).keyup(function(e) {
                var value = this.value;
                if (e.keyCode == 13) {
                    todo.createTodo(value);
                    $(this).parents('article').remove();
                }
            });

        },

        // use event delegation to assign click event to delete button
        deleteTodo: function() {

            $('main').on('click', '.delete', function() {
                $(this).parents('article').remove();
                todo.subtractRemain();
            });
        },

        //checkOff adds the 'checked' class to the article whose check button is being clicked
        checkOff: function() {
            $('main').on('click', '.checkbox', function() {
                $(this).addClass('btnCheck');
                $(this).siblings('.text').addClass('checked');
                $(this).parents('article').addClass('articleChecked');
                $(this).parents('article').removeClass('active');

                todo.subtractRemain();
            });
        },

        //clearComplete clears all articles (todos) with class articlechecked added in checkoff function
        clearComplete: function() {
            $('footer').on('click', '.clear', function() {
                $('article.articleChecked').hide();
            });
        },

        //showAll function unhides the completed todos
        showAll: function() {
            $('footer').on('click', '.show-all', function() {
                console.log($('.articlechecked'));
                $('article').css('display', 'block');
            });
        },
        //showActive function hides completed todos
        showActive: function() {
            $('footer').on('click', '.show-active', function() {
                $('article.articleChecked').hide();
            });
        },
        //showCompleted hides active todos and shows completed todos.
        showCompleted: function() {
            $('footer').on('click', '.show-completed', function() {
                $('article').css('display', 'block');
                $('article.active').hide();
            });
        },

        init: function() {
            todo.getTodo();
            todo.deleteTodo();
            todo.checkOff();
            todo.clearComplete();
            todo.showAll();
            todo.showActive();
            todo.showCompleted();
        }
    };
    todo.init();
});
