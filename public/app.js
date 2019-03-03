// open and close comment modal function
modalShow() => {
   $('#modal_' + $(this).attr('data-id')).show();
   
   modalClose() => {
       $('#modal_' + $(this).attr('data-id')).hide();
   };

   $(document).on('click', '.comment-button', modalClose);
};
$(document).on('click'), '.comment-button', modalShow);

$(document).on('click', '#savecomment') => {
    var articleId = $(this).attr('data-id');
    var commentText = $('#bodyinput'+$(this).attr('data-id')).val();

    $.ajax({
        method: 'POST',
        url: '/articles/' + thisId,
        data: {
            body: commentBody
        }
    })
    .done((data) => {
        location.reload();
    });
};

$(document).on('click', '#deletecomment') => {
    var id = $(this).attr('data-comment');

    $.ajax({
        method: 'POST',
        url: '/articles/delete/' + id,
        data: {

        }
    })

    .done((data) => {
        location.reload();
    });
};

$(document).on('click', '.save-button') => {
    var id = $(this).attr('data-id');

    $.ajax({
        method: 'POST',
        url: '/articles/save/' + id,
        data: {

        }
    })

    .done((data) => {
        location.reload();
    });
};

$(document).on('click', '.unsave-button') => {
    var id = $(this).attr('data-id');

    $.ajax({
        method: 'POST',
        url: '/articles/unsave/' + id,
        data: {

        }

    })

    done((data) => {
        location.reload();
    });
};