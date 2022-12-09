// -- lazy loader (improves website loading & throttling)
document.addEventListener("DOMContentLoaded", function() 
{
    var lazyloadImages = document.querySelectorAll("img[l]");    
    var lazyloadThrottleTimeout;
    
    function lazyload () 
    {
        if(lazyloadThrottleTimeout) 
        {
            clearTimeout(lazyloadThrottleTimeout);
        }    
        
        lazyloadThrottleTimeout = setTimeout(function() 
        {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) 
            {
                if(img.offsetTop < (window.innerHeight + scrollTop)) 
                {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });

            if(lazyloadImages.length == 0) 
            { 
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 
        20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});

// -- Things that are disabled lol
document.querySelectorAll("[disabled]").disabled = true;

// -- open a popup with info related to it
document.addEventListener('click', () => {
    var caret = document.getElementById('caret-popup')
})

// -- Big API to add subgrid boxes to page
$(document).ready(function () 
{
    $.getJSON("data.json", function (data) 
    {

        var raw = '';
        var disabled = '';

        $.each(data, function (key, value) 
        {
            // if item is disabled
            if (JSON.parse(JSON.stringify(value)).disabled == true)
            {
                disabled = 'disabled';
            }
            else
            {
                disabled = '';
            }

            raw = `
                <div style="background: ` + JSON.parse(JSON.stringify(value)).theme + `;" class="subgrid" type="` + JSON.parse(JSON.stringify(value)).type + `">
                    <img style="border-radius:` + JSON.parse(JSON.stringify(value)).icon[1] + `;" src="` + JSON.parse(JSON.stringify(value)).icon[0] + `">
                    <p>
                        <h3>` + JSON.parse(JSON.stringify(value)).title + `</h3>
                        <p class="sub-height">
                            ` + JSON.parse(JSON.stringify(value)).description + `
                        </p>
                    </p>
                    <p class="warns">
                    </p>
                    <p>
                        <div style="display: inline;">
                            <a class="download" href="` + JSON.parse(JSON.stringify(value))['default'].win + `" download>
                                <button ` + disabled + `>&ensp; Download <i class="fa-brands fa-windows icons"></i></button>
                            </a>      
                        </div>
                    </p>
                    <p>
                        <div style="display: inline;">
                            <a class="download" href="` + JSON.parse(JSON.stringify(value))['default'].mac + `" download>
                                <button ` + disabled + `>&ensp; Download <i class="fa-brands fa-apple icons"></i></button>
                            </a>
                        </div>
                    </p>
                    <p class="extras">
                    </p>
                </div>
            `
            
            $('.grid').append(raw); // First

            if (JSON.parse(JSON.stringify(value)).disabled == true)
                return; // don't continue

            // Additional if needed
            if (JSON.parse(JSON.stringify(value)).enable_extra == true)
            {
                var list = '';
                var extra = `
                    Additional files
                    <ul class="extras-list">
                    </ul>
                `

                $(`[type='` + JSON.parse(JSON.stringify(value)).type + `']` + ` .extras`).append(extra); // First

                $.each(JSON.parse(JSON.stringify(value)).extra, function (keys, values) {
                    if (!values[1]) // mac
                    {
                        list = `
                            <li>` + keys + `<text class="icons"><a href="` + values[0] + `"><i style="padding-right: 10px;" class="fa-brands fa-windows"></i></a></text></li>
                        `   
                    }
                    else if (!values[0])
                    {
                        list = `
                            <li>` + keys + `<text class="icons"><a href="` + values[1] + `"><i style="padding-right: 10px;" class="fa-brands fa-apple"></i></a></text></li>
                        `   
                    }
                    else
                    [
                        list = `
                            <li>` + keys + `<text class="icons"><a href="` + values[0] + `"><i style="padding-right: 5px" class="fa-brands fa-windows"></i></a> <a href="` + values[1] + `"><i style="padding-right: 10px;" class="fa-brands fa-apple"></i></a></text></li>
                        `   
                    ]

                    $(`[type='` + JSON.parse(JSON.stringify(value)).type + `']` + ` .extras-list`).append(list);
                })
            }

            // Warn about something?
            if (JSON.parse(JSON.stringify(value)).enable_warn == true)
            {
                var warn = `
                    <small><i class="fa-solid fa-circle-exclamation"></i> <text class="warn">` + JSON.parse(JSON.stringify(value)).warn + `</text></small>
                `

                $(`[type='` + JSON.parse(JSON.stringify(value)).type + `']` + ` .warns`).append(warn); // First
            }
        });
    });
});