"use client"

import L from "leaflet"
import { MapContainer, TileLayer, Marker } from "react-leaflet"

import "leaflet/dist/leaflet.css"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
})

const mapProps = {
	center: {
		lat: 35.66912628969876,
		lng: 51.31956858095572,
	},
	otherCenter: {
		lat: 35.6756297960942,
		lng: 51.30276400406363,
	},
	zoom: 12,
}

const Map = () => {
	return (
		<MapContainer
			center={[mapProps.center.lat, mapProps.center.lng]}
			zoom={mapProps.zoom}
			scrollWheelZoom={false}
			className="h-[400px] w-[75%] lg:w-[600px] mx-auto rounded-lg">
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker
				position={[mapProps.center.lat, mapProps.center.lng]}
				riseOnHover
				title="دفتر مرکزی متالورژی پارسیان"
				interactive
			/>

			<Marker
				position={[mapProps.otherCenter.lat, mapProps.otherCenter.lng]}
				riseOnHover
				title="دفتر نمایندگی متالورژی پارسیان"
				interactive
			/>
		</MapContainer>
	)
}

export default Map
