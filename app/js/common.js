$(document).ready(function() {
	initHeaderScroll();
	initAnchorLinks();
	initReviewsSlider();

	function initHeaderScroll() {
		var header = $('.header'),
			navigation = header.find('.navigation'),

			_scroll = function() {
				if ($(window).scrollTop() > 0) {
					header.addClass('header_scrolled');
				} else {
					header.removeClass('header_scrolled');
				}
			};

		_scroll();

		$(window).bind('scroll', _scroll);
	}

	function initAnchorLinks() {
		$('a[data-target="anchor"]').each(function(i,el) {
			$(el).bind('click', function(evt) {
				var href = $(el).attr('href'),
					hrefIndex = href.indexOf('#');

				if (hrefIndex > 0) {
					href = href.substring(hrefIndex);
				}
				if (href.length > 1 && $(href)) {
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
});