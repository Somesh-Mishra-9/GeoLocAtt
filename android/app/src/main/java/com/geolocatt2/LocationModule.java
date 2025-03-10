package com.geolocatt2;

import android.app.Activity;
import android.content.IntentSender;
import android.location.LocationManager;
import android.content.Context;
import android.provider.Settings;
import android.content.Intent;
import android.location.Location;
import android.os.Looper;
import android.Manifest;
import android.content.pm.PackageManager;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.Priority;
import com.google.android.gms.tasks.OnSuccessListener;

public class LocationModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback locationCallback;
    private boolean isResolved = false;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1001;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.fusedLocationClient = LocationServices.getFusedLocationProviderClient(reactContext);
    }

    @Override
    public String getName() {
        return "LocationModule";
    }

    private boolean checkLocationPermission() {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            return false;
        }
        
        return ActivityCompat.checkSelfPermission(activity, 
                Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    @ReactMethod
    public void checkAndRequestLocationSettings(Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            promise.reject("ACTIVITY_NULL", "Activity is not available");
            return;
        }

        // Check for location permission first
        if (!checkLocationPermission()) {
            promise.reject("PERMISSION_DENIED", "Location permission not granted");
            return;
        }

        LocationManager locationManager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
        boolean isLocationEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
                                  locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

        if (!isLocationEnabled) {
            // Open location settings
            Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
            activity.startActivity(intent);
            promise.reject("LOCATION_DISABLED", "Please enable location services");
        } else {
            promise.resolve(true);
        }
    }
    
    @ReactMethod
    public void getLocation(final Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            promise.reject("ACTIVITY_NULL", "Activity is not available");
            return;
        }

        // Check for location permission
        if (!checkLocationPermission()) {
            promise.reject("PERMISSION_DENIED", "Location permission not granted");
            return;
        }

        LocationManager locationManager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
        boolean isLocationEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
                                  locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

        if (!isLocationEnabled) {
            promise.reject("LOCATION_DISABLED", "Location services are disabled");
            return;
        }

        isResolved = false;

        try {
            LocationRequest locationRequest = new LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 10000)
                    .setWaitForAccurateLocation(false)
                    .setMinUpdateIntervalMillis(5000)
                    .setMaxUpdateDelayMillis(10000)
                    .build();

            locationCallback = new LocationCallback() {
                @Override
                public void onLocationResult(LocationResult locationResult) {
                    if (locationResult == null) {
                        if (!isResolved) {
                            isResolved = true;
                            promise.reject("LOCATION_UNAVAILABLE", "Could not get location");
                        }
                        return;
                    }
                    
                    Location location = locationResult.getLastLocation();
                    if (location != null && !isResolved) {
                        WritableMap locationMap = Arguments.createMap();
                        locationMap.putDouble("latitude", location.getLatitude());
                        locationMap.putDouble("longitude", location.getLongitude());
                        locationMap.putDouble("accuracy", location.getAccuracy());
                        locationMap.putDouble("altitude", location.getAltitude());
                        locationMap.putDouble("speed", location.getSpeed());
                        
                        fusedLocationClient.removeLocationUpdates(locationCallback);
                        isResolved = true;
                        promise.resolve(locationMap);
                    } else if (!isResolved) {
                        isResolved = true;
                        promise.reject("LOCATION_UNAVAILABLE", "Could not get location");
                    }
                }
            };

            fusedLocationClient.requestLocationUpdates(
                    locationRequest,
                    locationCallback,
                    Looper.getMainLooper()
            );

            // Also try to get last known location as a fallback
            fusedLocationClient.getLastLocation().addOnSuccessListener(activity, new OnSuccessListener<Location>() {
                @Override
                public void onSuccess(Location location) {
                    if (location != null && !isResolved) {
                        WritableMap locationMap = Arguments.createMap();
                        locationMap.putDouble("latitude", location.getLatitude());
                        locationMap.putDouble("longitude", location.getLongitude());
                        locationMap.putDouble("accuracy", location.getAccuracy());
                        locationMap.putDouble("altitude", location.getAltitude());
                        locationMap.putDouble("speed", location.getSpeed());
                        
                        fusedLocationClient.removeLocationUpdates(locationCallback);
                        isResolved = true;
                        promise.resolve(locationMap);
                    }
                }
            });
        } catch (Exception e) {
            promise.reject("LOCATION_ERROR", e.getMessage());
        }
    }
} 