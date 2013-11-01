safari.application.addEventListener('beforeSearch', handleBeforeSearch, false);

function handleBeforeSearch(event) {

  var settings = safari.extension.settings;
	event.preventDefault();

  if (!settings.has_run) {
    var languageAndCountry = window.navigator.language;
    languageAndCountry = languageAndCountry.toLowerCase();

    settings.language_namespace = getLanguageNamespace(languageAndCountry) || settings.language_namespace;
    settings.country_namespace  = getCountryNamespace(languageAndCountry)  || settings.country_namespace;

    settings.has_run = 1;
  }

  var url = 'http://www.serchilo.net/';

  if ('' == settings.user_name) {
    settings.usage_type = 'n';
  }

	switch (settings.usage_type) {
    case 'n':
      url += 'n/' + settings.language_namespace + '.' + settings.country_namespace;
      if (settings.custom_namespaces) {
        url += '.' + settings.custom_namespaces; 
      }
      url += '?';
      if (settings.default_keyword) {
        url += 'default_keyword=' + settings.default_keyword + '&'; 
      }
      break;
    case 'u':
      url += 'u/' + settings.user_name; 
      url += '?';
      break;
  }

  url += 'query=';
  url += event.query;
	event.target.url = url;
}

function getLanguageNamespace(languageAndCountry) {

	if (languageAndCountry != '') {
		languageAndCountry = languageAndCountry.split('-');

		// add language_namespace
		if (languageAndCountry[0].length == 2) {
			var language_namespace = languageAndCountry[0];
			language_namespace = language_namespace.toLowerCase();
      return language_namespace;
		}
	}
}

function getCountryNamespace(languageAndCountry) {

	if (languageAndCountry != '') {
		languageAndCountry = languageAndCountry.split('-');

		if (languageAndCountry.length > 1) {
			var country_namespace_2letter = languageAndCountry[1];
			var country_namespace_3letter = serchilo_2letter_to_3letter_country_code(country_namespace_2letter); 
			if (country_namespace_3letter) {
				var country_namespace = country_namespace_3letter.toLowerCase();
        return country_namespace;
			}
		}
	}
}


function serchilo_2letter_to_3letter_country_code( letter2 ) {

  country_codes = {
    'af' : 'afg',
    'al' : 'alb',
    'dz' : 'dza',
    'as' : 'asm',
    'ad' : 'and',
    'ao' : 'ago',
    'ai' : 'aia',
    'aq' : 'ata',
    'ag' : 'atg',
    'ar' : 'arg',
    'am' : 'arm',
    'aw' : 'abw',
    'au' : 'aus',
    'at' : 'aut',
    'az' : 'aze',
    'bs' : 'bhs',
    'bh' : 'bhr',
    'bd' : 'bgd',
    'bb' : 'brb',
    'by' : 'blr',
    'be' : 'bel',
    'bz' : 'blz',
    'bj' : 'ben',
    'bm' : 'bmu',
    'bt' : 'btn',
    'bo' : 'bol',
    'ba' : 'bih',
    'bw' : 'bwa',
    'bv' : 'bvt',
    'br' : 'bra',
    'io' : 'iot',
    'bn' : 'brn',
    'bg' : 'bgr',
    'bf' : 'bfa',
    'bi' : 'bdi',
    'kh' : 'khm',
    'cm' : 'cmr',
    'ca' : 'can',
    'cv' : 'cpv',
    'ky' : 'cym',
    'cf' : 'caf',
    'td' : 'tcd',
    'cl' : 'chl',
    'cn' : 'chn',
    'cx' : 'cxr',
    'cc' : 'cck',
    'co' : 'col',
    'km' : 'com',
    'cg' : 'cog',
    'cd' : 'cod',
    'ck' : 'cok',
    'cr' : 'cri',
    'ci' : 'civ',
    'hr' : 'hrv',
    'cu' : 'cub',
    'cy' : 'cyp',
    'cz' : 'cze',
    'dk' : 'dnk',
    'dj' : 'dji',
    'dm' : 'dma',
    'do' : 'dom',
    'tp' : 'tmp',
    'ec' : 'ecu',
    'eg' : 'egy',
    'sv' : 'slv',
    'gq' : 'gnq',
    'er' : 'eri',
    'ee' : 'est',
    'et' : 'eth',
    'fk' : 'flk',
    'fo' : 'fro',
    'fj' : 'fji',
    'fi' : 'fin',
    'fr' : 'fra',
    'fx' : 'fxx',
    'gf' : 'guf',
    'pf' : 'pyf',
    'tf' : 'atf',
    'ga' : 'gab',
    'gm' : 'gmb',
    'ge' : 'geo',
    'de' : 'deu',
    'gh' : 'gha',
    'gi' : 'gib',
    'gr' : 'grc',
    'gl' : 'grl',
    'gd' : 'grd',
    'gp' : 'glp',
    'gu' : 'gum',
    'gt' : 'gtm',
    'gn' : 'gin',
    'gw' : 'gnb',
    'gy' : 'guy',
    'ht' : 'hti',
    'hm' : 'hmd',
    'va' : 'vat',
    'hn' : 'hnd',
    'hk' : 'hkg',
    'hu' : 'hun',
    'is' : 'isl',
    'in' : 'ind',
    'id' : 'idn',
    'ir' : 'irn',
    'iq' : 'irq',
    'ie' : 'irl',
    'il' : 'isr',
    'it' : 'ita',
    'jm' : 'jam',
    'jp' : 'jpn',
    'jo' : 'jor',
    'kz' : 'kaz',
    'ke' : 'ken',
    'ki' : 'kir',
    'kp' : 'prk',
    'kr' : 'kor',
    'kw' : 'kwt',
    'kg' : 'kgz',
    'la' : 'lao',
    'lv' : 'lva',
    'lb' : 'lbn',
    'ls' : 'lso',
    'lr' : 'lbr',
    'ly' : 'lby',
    'li' : 'lie',
    'lt' : 'ltu',
    'lu' : 'lux',
    'mo' : 'mac',
    'mk' : 'mkd',
    'mg' : 'mdg',
    'mw' : 'mwi',
    'my' : 'mys',
    'mv' : 'mdv',
    'ml' : 'mli',
    'mt' : 'mlt',
    'mh' : 'mhl',
    'mq' : 'mtq',
    'mr' : 'mrt',
    'mu' : 'mus',
    'yt' : 'myt',
    'mx' : 'mex',
    'fm' : 'fsm',
    'md' : 'mda',
    'mc' : 'mco',
    'mn' : 'mng',
    'ms' : 'msr',
    'ma' : 'mar',
    'mz' : 'moz',
    'mm' : 'mmr',
    'na' : 'nam',
    'nr' : 'nru',
    'np' : 'npl',
    'nl' : 'nld',
    'an' : 'ant',
    'nc' : 'ncl',
    'nz' : 'nzl',
    'ni' : 'nic',
    'ne' : 'ner',
    'ng' : 'nga',
    'nu' : 'niu',
    'nf' : 'nfk',
    'mp' : 'mnp',
    'no' : 'nor',
    'om' : 'omn',
    'pk' : 'pak',
    'pw' : 'plw',
    'pa' : 'pan',
    'pg' : 'png',
    'py' : 'pry',
    'pe' : 'per',
    'ph' : 'phl',
    'pn' : 'pcn',
    'pl' : 'pol',
    'pt' : 'prt',
    'pr' : 'pri',
    'qa' : 'qat',
    're' : 'reu',
    'ro' : 'rom',
    'ru' : 'rus',
    'rw' : 'rwa',
    'kn' : 'kna',
    'lc' : 'lca',
    'vc' : 'vct',
    'ws' : 'wsm',
    'sm' : 'smr',
    'st' : 'stp',
    'sa' : 'sau',
    'sn' : 'sen',
    'sc' : 'syc',
    'sl' : 'sle',
    'sg' : 'sgp',
    'sk' : 'svk',
    'si' : 'svn',
    'sb' : 'slb',
    'so' : 'som',
    'za' : 'zaf',
    'gs' : 'sgs',
    'es' : 'esp',
    'lk' : 'lka',
    'sh' : 'shn',
    'pm' : 'spm',
    'sd' : 'sdn',
    'sr' : 'sur',
    'sj' : 'sjm',
    'sz' : 'swz',
    'se' : 'swe',
    'ch' : 'che',
    'sy' : 'syr',
    'tw' : 'twn',
    'tj' : 'tjk',
    'tz' : 'tza',
    'th' : 'tha',
    'tg' : 'tgo',
    'tk' : 'tkl',
    'to' : 'ton',
    'tt' : 'tto',
    'tn' : 'tun',
    'tr' : 'tur',
    'tm' : 'tkm',
    'tc' : 'tca',
    'tv' : 'tuv',
    'ug' : 'uga',
    'ua' : 'ukr',
    'ae' : 'are',
    'gb' : 'gbr',
    'us' : 'usa',
    'um' : 'umi',
    'uy' : 'ury',
    'uz' : 'uzb',
    'vu' : 'vut',
    've' : 'ven',
    'vn' : 'vnm',
    'vg' : 'vgb',
    'vi' : 'vir',
    'wf' : 'wlf',
    'eh' : 'esh',
    'ye' : 'yem',
    'zm' : 'zmb',
    'zw' : 'zwe'
	};
	if (letter2 in country_codes) {
		var letter3 = country_codes[letter2];	
		return letter3;
	}

}
