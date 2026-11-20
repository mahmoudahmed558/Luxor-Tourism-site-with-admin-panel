<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TripController extends Controller
{
    /**
     * Home page — sends trips and cities formatted for the multilingual frontend.
     * 
     * The frontend Home.jsx expects:
     * - trips[]: { id, from, to, fromPoints[], toPoints[], carModel, time, available, duration, price, amenities[], rating }
     *   where from/to/carModel/time/duration are strings and fromPoints/toPoints/amenities are flat arrays
     *   All values must be in the currently selected language (handled by component using `lang` state).
     *   Since the component selects language client-side, we send all language variants as an object.
     * 
     * - cities[]: { name: {ar,en,cn}, points: {ar:[...],en:[...],cn:[...]} }
     *   Home.jsx uses: city.name[lang] and city.gatheringPlaces/dropOffPlaces (we map points to both)
     */
    public function index()
    {
        $dbTrips = Trip::all();
        $dbCities = City::all();

        // Transform trips: the frontend uses trip.from, trip.to etc as 
        // language-selected strings. The old frontend data had flat per-language
        // arrays in tripsData[lang]. In the Inertia backend version, Home.jsx 
        // reads from usePage().props with { trips, cities } format.
        // We send language-keyed objects and the component accesses them by lang.
        $trips = $dbTrips->map(function ($trip) {
            return [
                'id' => $trip->id,
                'from' => $trip->from_city,          // {ar: "القاهرة", en: "Cairo", cn: "开罗"}
                'to' => $trip->to_city,              // {ar: "الإسكندرية", en: "Alexandria", cn: "亚历山大"}
                'fromPoints' => $trip->from_points,  // {ar: [...], en: [...], cn: [...]}
                'toPoints' => $trip->to_points,      // {ar: [...], en: [...], cn: [...]}
                'carModel' => $trip->car_model,      // {ar: "...", en: "...", cn: "..."}
                'time' => $trip->time,               // {ar: "08:00 ص", en: "08:00 AM", cn: "上午08:00"}
                'available' => $trip->available,
                'duration' => $trip->duration,       // {ar: "3 ساعات", en: "3 hours", cn: "3小时"}
                'price' => (float) $trip->price,
                'amenities' => $trip->amenities,     // {ar: [...], en: [...], cn: [...]}
                'rating' => (float) $trip->rating,
            ];
        });

        // Transform cities: Home.jsx accesses city.name[lang] and city.gatheringPlaces/dropOffPlaces
        // We set points as both gatheringPlaces and dropOffPlaces
        $cities = $dbCities->map(function ($city) {
            return [
                'id' => $city->id,
                'name' => $city->name,              // {ar: "الاقصر", en: "Luxor", cn: "卢克索"}
                'points' => $city->points,           // {ar: [...], en: [...], cn: [...]}
                'gatheringPlaces' => $city->points,  // alias for the dropdown
                'dropOffPlaces' => $city->points,    // alias for the dropdown
            ];
        });

        return Inertia::render('Home', [
            'trips' => $trips->values(),
            'cities' => $cities->values(),
        ]);
    }
}
