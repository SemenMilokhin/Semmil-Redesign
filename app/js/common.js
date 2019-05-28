$(document).ready(function() {
	var WW = $(window).outerWidth();
	$(window).bind('resize', function(){
		WW = $(window).outerWidth();
	});

	initHeaderScroll();
	initAdaptiveHeaderMenu();
	initAnchorLinks();
	initReviewsSlider();
	initContactForm();

	function initHeaderScroll() {
		if($('#index-page').length !== 0) {
			var header = $('.header'),
				navigation = header.find('.navigation'),

				_scroll = function() {
					if (WW > 1170) {
						if ($(window).scrollTop() > 0) {
							header.addClass('header_scrolled');
						} else {
							header.removeClass('header_scrolled');
						}
					} else {
						header.addClass('header_scrolled');
					}
				};

			_scroll();

			$(window).bind('scroll', _scroll);
			$(window).bind('resize', _scroll);
		}
	}
	function initAdaptiveHeaderMenu() {
		var header = $('.header'),
			nav    = header.find('.navigation'),
			navBtn = header.find('.navigation-btn'),
			btnActive = true,
			burger = navBtn.find('.burger'),
			menuItems = nav.find('.navigation__item'),
			menuLinks = nav.find('.navigation__link'),
			menuItemsLength = menuItems.length,
			timeOut = 150,
			animationTime = menuItemsLength*100 + (menuItemsLength-1)*timeOut,
			closeMenu = function() {
				if (burger.hasClass('burger_opened') && btnActive) {
					btnActive = false;
					burger.removeClass('burger_opened');
					menuItems.each(function(i,el){
						setTimeout(function(){
							$(el).removeClass('navigation__item_show');
						}, (menuItemsLength-1)*timeOut-i*timeOut+timeOut);
					});
					setTimeout(function(){
						nav.removeClass('navigation_opened');
						btnActive = true;
					}, animationTime);
				}
			},
			openMenu = function() {
				if (!burger.hasClass('burger_opened') && btnActive){
					btnActive = false;
					burger.addClass('burger_opened');
					nav.addClass('navigation_opened');
					menuItems.each(function(i,el){
						setTimeout(function () {
							$(el).addClass('navigation__item_show');
						}, i*timeOut+timeOut);
					});
					setTimeout(function(){
						btnActive = true;
					}, animationTime);
				}
			};

		navBtn.on('click', function(evt) {
			evt.preventDefault();
			evt.stopPropagation();
			openMenu();
			closeMenu();
		});

		menuLinks.each(function(i,el) {
			$(el).on('click', function(evt) {
				evt.stopPropagation();
				closeMenu();
			});
		});
		$('html').bind('click', function(evt){
			closeMenu();
		});
	}
	function initAnchorLinks() {
		$('a[data-target="anchor"]').each(function(i,el) {
			$(el).bind('click', function(evt) {
				var href = $(el).attr('href'),
					hrefIndex = href.indexOf('#');

				if (hrefIndex > 0) {
					href = href.substring(hrefIndex);
				}
				if (href.length > 1 && $(href).length !== 0) {
					evt.preventDefault();
					$('body, html').animate({
						scrollTop: $(href).offset().top
					},1000);
				}
			});
		});
	}
	function initReviewsSlider() {
		if($('.section-reviews')) {
			var section = $('.section-reviews'),
				reviews = section.find('.reviews'),
				slider = reviews.find('.reviews__slider'),
				sliderControls = reviews.find('.reviews__slider-controls'),
				arrowLeft = sliderControls.find('.reviews__slider-arrow_left'),
				arrowRight = sliderControls.find('.reviews__slider-arrow_right');

			slider.slick({
				appendArrows: sliderControls,
				prevArrow: arrowLeft,
				nextArrow: arrowRight
			});
		}
	}
	function initContactForm() {
		var form = $('#contact-form'),
			action = form.attr('action'),
			btn = form.find('button[type="submit"]'),
			btnActive = true;

		form.validate({
				onsubmit: false,
				highlight: function (element) {
					$(element).parent('div').addClass('contact__required-field-wrapper_error');
				},
				unhighlight: function (element) {
					$(element).parent('div').removeClass('contact__required-field-wrapper_error');
				},
				rules: {
					name: {
						required: true,
						maxlength: 50
					},
					email: {
						required: true,
						email: true,
						maxlength: 50
					},
					message: {
						required: true,
						maxlength: 10000
					}
				},
				messages: {
					name: {
						required: "Введите ваше имя",
						maxlength: "Слишком много символов"
					},
					email: {
						required: "Для связи нужна ваша электронная почта",
						email: "Это не выглядит как адрес электронной почты",
						maxlength: "Слишком много символов"
					},
					message: {
						required: "Напишите пару слов",
						maxlength: "Слишком много символов"
					}
				}
			});

		form.on('submit', function(evt) {
			if (form.valid() && btnActive) {
				var formData = {
					name: form.find('#contact-name').val(),
					email: form.find('#contact-email').val(),
					message: form.find('#contact-message').val()
				};
				$.ajax({
					url: action,
					type: 'POST',
					data: formData,
					error: function(request, txtstatus, errorThrown){
						console.log(request);
						console.log(txtstatus);
						console.log(errorThrown);
						btn.text('Ошибка! Попробуйте снова');
						btn.addClass('btn_error');
						btnActive = false;
						setTimeout(function () {
							btn.text('Отправить');
							btn.removeClass('btn_error');
							btnActive = true;
						}, 3000);
					},
					success: function() {
						btn.text('Сообщение отправлено');
						btnActive = false;
						setTimeout(function () {
							$('section.contact-me').slideUp(700,function(){
								$(this).remove();
							});
						}, 3000);
					}
				});
			} else if (!form.valid()){
				btn.text('Данные формы некорректы');
				btn.addClass('btn_error');
				btnActive = false;
				setTimeout(function () {
					btn.text('Отправить');
					btn.removeClass('btn_error');
					btnActive = true;
				}, 5000);
			} else if (form.valid() && !btnActive) {
				btn.text('Подождите');
			}	
			evt.preventDefault();
		});
	}
});