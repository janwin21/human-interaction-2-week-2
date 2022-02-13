// component section
"use strict";

// ready the document
$(document).ready(() => {
    
    //----------------------------------------------------------------------------------------------------------//
    // NAV_DROPDOWN SECTION
    const navbar = $('.navbar');
    const nav_dropdown = $('.nav-dropdown').hide();
    const nav_template = `<!-- NAV_DROPDOWN FORMAT -->
        <div class="card bg-dark text-white col-4 p-0 m-0">
            <img src="../public/images//backgrounds/{{ element }}.jpg" class="card-img" alt="card-background">
            <div class="card-img-overlay opaque">
                <button type="button" class="btn btn-dark btn-overlay w-100 shadow-none">{{ element }}</button>
            </div>
        </div>`;
    const nav_list = [
        ['history', 'payment', 'facilities'],
        ['product-1', 'product-2', 'product-3'],
        ['room-1', 'room-2', 'room-3'],
        ['branch-1', 'branch-2', 'branch-3'],
        ['client-1', 'client-2', 'client-3']
    ];

    // INSERT DROPDOWN TEXT
    const insert_dropdown = arr => {
        let nav_text = '';
        
        for(let i = 0; i < arr.length; i++) {
            nav_text += nav_template.replaceAll('{{ element }}', arr[i]);
        }

        nav_dropdown.html(nav_text);
        nav_dropdown.fadeIn(250, () => { nav_dropdown.show(); });
    };
    //----------------------------------------------------------------------------------------------------------//
    // TRIGGER NAV-DROPDOWN BTN EVENT
    nav_dropdown.on('mouseover', '.btn-overlay', event => {
        $(event.currentTarget).parent().toggleClass('opaque').toggleClass('light-opaque'); }); // mouseover
    nav_dropdown.on('mouseleave', '.btn-overlay', event => {
        $(event.currentTarget).parent().toggleClass('opaque').toggleClass('light-opaque'); }); // mouseleave
    //----------------------------------------------------------------------------------------------------------//
    // DISPLAY NAV-DROPDOWN BY CLICK NAV-BTN
    const nav_subtitle = $('.nav-subtitle');

    $('.nav-subtitle').on('click', 'button', event => {
        nav_dropdown.fadeOut(250, () => {
            insert_dropdown(nav_list[event.currentTarget.dataset.index]);
        });
    });
    //----------------------------------------------------------------------------------------------------------//
    // TRIGGER THE NAVBAR IF IT IS TRUE WHILE SCROLLING
    const nav_menu = $('.nav-menu').hide();
    const link_close = $('.link-close');
    let nav_active = false;

    link_close.parent().hide(); // parents

    $(document).on('scroll', () => {
        if(navbar.offset().top > 200) { 
            if(!nav_active) {
                nav_menu.show();
                nav_menu.find('.li-bar').each((index, element) => {
                    if(index != 5) $(element).fadeIn(250);
                    $('.li-menu').find('a').fadeOut(250);
                    $('.close-2').find('a').fadeIn(250);
                });
                nav_dropdown.hide();
                nav_active = true;
            }
        } else {
            nav_menu.hide();
            nav_dropdown.hide();
            nav_active = false;
        }
    });

    nav_menu.on('click', '.nav-link', event => {
        event.preventDefault();

        if(event.currentTarget.dataset.index == 5) {
            nav_dropdown.fadeOut(250);
            $(event.currentTarget).parent().fadeOut(250);
            return;
        } else if(event.currentTarget.dataset.index == 6) {
            nav_menu.find('.nav-item').each((index, element) => { 
                if(index != 0) $(element).fadeOut(250);
                else { $(element).find('a').fadeIn(250); }
            });
            nav_dropdown.fadeOut(250);
            $(event.currentTarget).fadeOut(250);
            $(event.currentTarget).parent().fadeOut(250);
            return;
        }  else if(event.currentTarget.dataset.index == -1) {
            $(event.currentTarget).fadeOut(250);
            nav_menu.find('.nav-item').each((index, element) => { 
                if(!(index == 0 || index == 6)) $(element).fadeIn(250, () => { $(element).find('a').show() });
                else  $(element).fadeOut(250);
            });
            return;
        }  else {
            link_close.parent().fadeIn(250);
            nav_dropdown.fadeIn(250);
        }

        nav_dropdown.fadeOut(250, () => {
            insert_dropdown(nav_list[event.currentTarget.dataset.index]);
        });
    });
    //----------------------------------------------------------------------------------------------------------//

});