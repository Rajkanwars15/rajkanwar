$(function () {
    var $content = $('#jsonContent');
    var mediumName = "rajkanwars15";
    var apiKey = "";  // Replace with your actual API key

    var data = {
        rss_url: 'https://medium.com/feed/@' + mediumName,
        api_key: apiKey
    };

    $.ajax({
        url: 'https://api.rss2json.com/v1/api.json',
        method: 'GET',
        dataType: 'json',
        data: data
    }).done(function (response) {
        if (response.status == 'ok') {
            var output = '';
            var authorImage = response.feed.image || 'default-image-url'; // Add a fallback if there's no image
            var pathArray = authorImage.split("/");
            var imageId = pathArray[pathArray.length - 1];

            $.each(response.items, function (k, item) {
                var author = "https://medium.com/@" + mediumName;
                var src = item.description.match(/<img[^>]+src="([^">]+)"/);  // Use regex to extract image src
                src = src ? src[1] : 'default-image-url';  // Fallback if no image is found

                var time = item.pubDate.replace(/\s/, 'T') + 'Z';
                var formattedDate = new Date(time);
                var formattedDateStr = formattedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

                var contentWithoutImg = item.description.replace(/<img[^>]*>/g, ""); // Remove images from the description
                var trimmedString = contentWithoutImg.substr(0, 400);
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

                output += '<div class="row">' +
                    '<div class="col-12 col-lg-8 col-md-8 col-sm-12 col-centered" style="margin: auto;">' +
                    '<div class="mainbox">' +
                    // '<div>' +
                    // '<div class="profile_img">' +
                    // '<img alt="' + item.author + '" style="border-radius: 50%;display: block; height: 40px; width: 40px;" src="https://miro.medium.com/fit/c/80/80/' + imageId + '" class="dp" width="40" height="40">' +
                    // '</div>' +
                    // '<div class="dr">' +
                    // '<a href="' + author + '" target="_blank"><span class="bx">' + item.author + '</span></a>' +
                    // '<span class="af">' + formattedDateStr + '</span>' +
                    // '</div>' +
                    // '</div>' +
                    '<div class="dsbox">' +
                    '<div class="dvbox">' +
                    '<a href="' + item.link + '" target="_blank"><img alt="" src="' + src + '" class="bhbox" width="720" height="210"></a>' +
                    '</div>' +
                    '<a href="' + item.link + '" target="_blank"><h3 class="eafont">' + item.title + '</h3></a>' +
                    '<div class="blog-cont">' +
                    '<p>' + trimmedString + '...</p>' +
                    '<p><a href="' + item.link + '" target="_blank"> Continue reading...</a></p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            });

            $content.html(output);
        }
    }).fail(function (error) {
        console.log("API Error: ", error);  // Log any API errors
    });
});
