(function($) {
  function zerofill(i) {
    return (i < 10 ? '0' : '') + i;
  }

  function setMinDate() {
    let datePicker = $('#datePicker')
    var date = new Date();
    const day = zerofill(date.getDate())
    const month = zerofill(date.getMonth()+1);
    datePicker.attr('min', date.getFullYear() + '-' + month + '-' + day);
  }

  function openModal(data) {
    $('.modal .cake').html(data.cake);
    $('.modal .firstName').html(data.firstName);
    $('.modal .lastName').html(data.lastName);
    $('.modal .deliveryDate').html(data.deliveryDate);
    $('.modal .deliveryHour').html(data.deliveryHour);
    $('.modal .phone').html(data.phone);
    $('.modal .email').html(data.email);
    $('.modal .address1').html(data.address1);
    $('.modal .address2').html(data.address2);
    $('.modal .city').html(data.city);
    $('.modal .region').html(data.region);
    toggleModal(true);
  }

  function toggleModal(boolean) {
    if(boolean) {
      $('.modal-backdrop').addClass('show');
      $('.modal').show().addClass('show');
    } else {
      $('.modal-backdrop').removeClass('show');
      $('.modal').hide().removeClass('show');
    }
  }

  function formSubmit() {
    $('#cakeForm').on('submit', (e) => {
      e.preventDefault();
      $('.loading').show();
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'post',
        dataType: 'json',
        data: $('form#cakeForm').serialize(),
        success: function(data) {
          openModal(data);
          $('.loading').hide();
        }
      });
    })
  }
  
  $(document).ready(function() {
    setMinDate();
    formSubmit();

    $('[data-bs-dismiss="modal"]').click(() => {
      toggleModal(false);
    })
  });

})(jQuery)