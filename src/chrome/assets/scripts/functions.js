function getShortUrl(url, callback)
{
	post('https://frama.link/a', {format: 'json', lsturl: url}, 'json', function(data){
		if(data.success)
			return callback(data.short);
	});
}

function loadLocale(code){

	getJSON('assets/locales/' + code + '.json', function(lang){
		document.querySelector('#startInfo').innerText= lang.start_info;
		document.querySelector('#btnConnectInstance').value = lang.obtain_access_code;
		document.querySelector('#status').innerText=lang.options_saved;
		document.querySelector('#options .panel-heading').innerText=lang.settings;
		document.querySelector('label[for="code"]').innerText=lang.access_code;
		document.querySelector('label[for="accesskey"]').innerText=lang.access_key;
		document.querySelector('label[for="instanceUrl"]').innerText=lang.instance_url;
		document.querySelector('label[for="shortner"]').innerText=lang.short_url_checkbox;
		document.querySelector('label[for="language"]').innerText=lang.language;
		document.querySelector('#instanceUrlHelp').innerText=lang.url_form_needed;
		document.querySelector('#save').value = lang.save;



		/*chrome.storage.sync.set({
			loading_message: lang.mastodon_instance_opening.split(' ').join('\u00a0'),
			share_selection: lang.share_selection
		});*/
	});
}

function getJSON(url, callback)
{
	return ajax('GET', url, null, 'json', callback);
}

function post(url, data, type, callback)
{
	return ajax('POST', url, data, type, callback);
}

function ajax(method, url, data, type, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);

	xhr.onload = function(){
		if(xhr.status >= 200 && xhr.status < 400)
		{
			if(type == 'json')
				var response = JSON.parse(xhr.responseText);
			else
				var response = xhr.responseText;

			return callback(response);
		}
		else
		{
			console.log(xhr);
		}
	}

	if(data!=null)
	{
		var formData = new FormData();

		for ( var key in data ) {
	    	formData.append(key, data[key]);
		}

		xhr.send(formData);
	}
	else
	{
		xhr.send();
	}

}