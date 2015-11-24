$(document).on("loadShared", function () {
	window.createMarker = function (coord, icon, label, popup, dataKey) {
		var mapKey = 'markers-' + map_path + '-hidden';
		var marker = L.marker(coord, setMarker(icon)).bindLabel(label).bindPopup(popup);

		marker.on('contextmenu', function (e) {
			toggleOpacity(e, mapKey);
			updatePills(e, dataKey);
		});

		if (isMarkerInvisible(mapKey, marker.getLatLng().lat, marker.getLatLng().lng)) {
			marker.setOpacity(invisibleMarkerOpacity);
			if(!markerCount[dataKey]) markerCount[dataKey] = 0;
		} else {
			markerCount[dataKey] = (markerCount[dataKey] + 1) || 1;
		}

		return marker;
	};

	window.setMarker = function (icon, tooltip) {
		return {icon : icon, riseOnHover : true};
	};

	window.getLatLngKey = function (lat, lng) {
		return lat + ';' + lng;
	};

	window.isMarkerInvisible = function (mapPath, lat, lng) {
		return invisibleMarkers[mapPath].indexOf(getLatLngKey(lat, lng)) > -1;
	};

	window.toggleOpacity = function (event, mapPath) {
		var key = getLatLngKey(event.latlng.lat, event.latlng.lng);

		if (event.target && event.target.options.opacity === 1.0) {
			event.target.setOpacity(invisibleMarkerOpacity);
			invisibleMarkers[mapPath].push(key);
		} else {
			event.target.setOpacity(1.0);
			invisibleMarkers[mapPath].splice(invisibleMarkers[mapPath].indexOf(key), 1);
		}

		localStorage[mapPath] = JSON.stringify(invisibleMarkers[mapPath]);
	};

	window.updatePills = function(event, dataKey) {
		if (event.target && event.target.options.opacity === 1.0) {
			markerCount[dataKey] = (markerCount[dataKey] + 1) || 1;
		} else {
			markerCount[dataKey] = (markerCount[dataKey] - 1) || 0;
		}
		$('ul.key:not(.controls) > li:not(.none) > i.'+dataKey+' ~ :last').text(markerCount[dataKey]);
	};

	window.resetInvisibleMarkers = function() {
		var mapKey = 'markers-' + map_path + '-hidden';
		invisibleMarkers[mapKey] = [];
		localStorage[mapKey] = JSON.stringify(invisibleMarkers[mapKey]);
		location.reload();
	};

	window.icons = {};
	window.markers = {};
	window.invisibleMarkers = {};
	window.markerCount = {};
	window.notes = {};

	var icons = window.icons;
	var markers = window.markers;
	var invisibleMarkerOpacity = 0.25;

	window.processData = function (data) {
		var mapKey = 'markers-' + map_path + '-hidden';

		if(!localStorage[mapKey]) {
			localStorage[mapKey] = JSON.stringify([]);
		}
		invisibleMarkers[mapKey] = JSON.parse(localStorage[mapKey]);

		var notesKey = 'notes'+map_path;
		if(!localStorage[notesKey]) {
			localStorage[notesKey] = JSON.stringify([]);
		}
		notes[map_path] = JSON.parse(localStorage[notesKey]);

		Object.keys(data).forEach(function (dataKey) {
			var items = data[dataKey];
			var groupItems = [];
			items.forEach(function (item) {
				if (item.popupTitle == null) {
					item.popupTitle = item.label;
				}
				item.coords.forEach(function (coord) {
					groupItems.push(createMarker(coord, icons[dataKey], item.label, '<h1>' + item.popupTitle + '</h1>' + item.popup, dataKey));
				});
			});
			markers[dataKey] = L.layerGroup(groupItems);
		});
	};

	icons.note_marker = L.icon({
		iconUrl  : '../files/img/icons/note_marker.png',
		iconSize : [20, 30]
	});

	//del 
	icons.abandoned = L.icon({
		iconUrl  : '../files/img/icons/abandoned.png',
		iconSize : [24, 35]
	});
	
	icons.location = L.icon({
		iconUrl  : '../files/img/icons/location_.png',
		iconSize : [24, 35]
	});

	icons.alchemy = L.icon({
		iconUrl  : '../files/img/icons/alchemy.png',
		iconSize : [20, 28]
	});

	icons.bobblehead = L.icon({
		iconUrl  : '../files/img/icons/bobblehead.png',
		iconSize : [24, 34]
	});

	//del
	icons.armourerstable = L.icon({
		iconUrl  : '../files/img/icons/armourerstable.png',
		iconSize : [30, 27]
	});
	
	// icons.powerarmor = L.icon({
		// iconUrl  : '../files/img/icons/powerarmor_.png',
		// iconSize : [30, 27]
	// });

	icons.banditcamp = L.icon({
		iconUrl  : '../files/img/icons/banditcamp.png',
		iconSize : [24, 35]
	});

	icons.barber = L.icon({
		iconUrl  : '../files/img/icons/barber.png',
		iconSize : [24, 35]
	});

	icons.blacksmith = L.icon({
		iconUrl  : '../files/img/icons/blacksmith.png',
		iconSize : [24, 35]
	});

	icons.brothel = L.icon({
		iconUrl  : '../files/img/icons/brothel.png',
		iconSize : [24, 35]
	});

	icons.entrance = L.icon({
		iconUrl  : '../files/img/icons/entrance.png',
		iconSize : [28, 27]
	});

	icons.grindstone = L.icon({
		iconUrl  : '../files/img/icons/grindstone.png',
		iconSize : [24, 35]
	});

	icons.guarded = L.icon({
		iconUrl  : '../files/img/icons/guarded.png',
		iconSize : [23, 34]
	});

	icons.gwent = L.icon({
		iconUrl  : '../files/img/icons/gwent.png',
		iconSize : [24, 30]
	});

	icons.harbor = L.icon({
		iconUrl  : '../files/img/icons/harbor.png',
		iconSize : [27, 30]
	});

	icons.herbalist = L.icon({
		iconUrl  : '../files/img/icons/herbalist.png',
		iconSize : [25, 28]
	});

	icons.hidden = L.icon({
		iconUrl  : '../files/img/icons/hidden.png',
		iconSize : [24, 24]
	});

	icons.magwasteland = L.icon({
		iconUrl  : '../files/img/icons/magwasteland.png',
		iconSize : [24, 30]
	});

	icons.monsterden = L.icon({
		iconUrl  : '../files/img/icons/monsterden.png',
		iconSize : [24, 35]
	});

	icons.monsternest = L.icon({
		iconUrl  : '../files/img/icons/monsternest.png',
		iconSize : [23, 30]
	});
	
	icons.quest = L.icon({
		iconUrl  : '../files/img/icons/quest.png',
		iconSize : [10, 30]
	});
	
	icons.sidequest = L.icon({
		iconUrl  : '../files/img/icons/sidequest.png',
		iconSize : [10, 30]
	})
	
	icons.miscquest = L.icon({
		iconUrl  : '../files/img/icons/miscquest.png',
		iconSize : [10, 30]
	});


	icons.notice = L.icon({
		iconUrl  : '../files/img/icons/notice.png',
		iconSize : [23, 28]
	});

	icons.pid = L.icon({
		iconUrl  : '../files/img/icons/pid.png',
		iconSize : [24, 34]
	});

	icons.pop = L.icon({
		iconUrl  : '../files/img/icons/pop.png',
		iconSize : [27, 30]
	});

	icons.poi = L.icon({
		iconUrl  : '../files/img/icons/poi.png',
		iconSize : [28, 28]
	});

	icons.shopkeeper = L.icon({
		iconUrl  : '../files/img/icons/merchant.png',
		iconSize : [21, 30]
	});
	
	icons.masterlock = L.icon({
		iconUrl  : '../files/img/icons/masterlock.png',
		iconSize : [24, 31]
	});
	
	icons.masterterminal = L.icon({
		iconUrl  : '../files/img/icons/masterterminal.png',
		iconSize : [21, 30]
	});

	icons.signpost = L.icon({
		iconUrl  : '../files/img/icons/fasttravel.png',
		iconSize : [27, 34]
	});

	icons.smugglers = L.icon({
		iconUrl  : '../files/img/icons/smugglers.png',
		iconSize : [24, 35]
	});

	icons.spoils = L.icon({
		iconUrl  : '../files/img/icons/spoils.png',
		iconSize : [25, 28]
	});
});
