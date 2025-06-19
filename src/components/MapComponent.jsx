"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "../css/map.css";
import { X } from "lucide-react";

export default function MapComponent({
  missions,
  currentMission,
  center,
  zoom,
  showMapHint,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);
  const [userPosition, setUserPosition] = useState(null);
  const [mapCoordinates, setMapCoordinates] = useState(center);
  const [locationStatus, setLocationStatus] = useState("RECHERCHE...");
  const [signalStrength, setSignalStrength] = useState({
    level: 2,
    text: "SIGNAL MOYEN",
  });
  const [isOverlayCollapsed, setIsOverlayCollapsed] = useState(false);

  // Fonction pour calculer la distance entre deux points (en mètres)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Fonction pour déterminer la force du signal basée sur la distance à la cible
  const calculateSignalStrength = (userPos, targetPos, accuracy) => {
    if (!userPos || !targetPos || !showMapHint) {
      return { level: 0, text: "AUCUN SIGNAL - CIBLE INCONNUE" };
    }

    const distance = calculateDistance(
      userPos[0],
      userPos[1],
      targetPos[0],
      targetPos[1]
    );

    let precisionFactor = 1;
    if (accuracy > 100) precisionFactor = 0.5;
    else if (accuracy > 50) precisionFactor = 0.7;
    else if (accuracy > 20) precisionFactor = 0.9;

    let signalLevel = 0;
    let signalText = "AUCUN SIGNAL";

    if (distance < 50) {
      signalLevel = Math.floor(4 * precisionFactor);
      signalText = "SIGNAL EXCELLENT - CIBLE PROCHE";
    } else if (distance < 100) {
      signalLevel = Math.floor(3 * precisionFactor);
      signalText = "SIGNAL FORT - APPROCHE CIBLE";
    } else if (distance < 200) {
      signalLevel = Math.floor(2 * precisionFactor);
      signalText = "SIGNAL MOYEN - CIBLE DÉTECTÉE";
    } else if (distance < 500) {
      signalLevel = Math.floor(1 * precisionFactor);
      signalText = "SIGNAL FAIBLE - CIBLE LOINTAINE";
    } else {
      signalLevel = 0;
      signalText = "AUCUN SIGNAL - HORS PORTÉE";
    }

    return {
      level: Math.max(0, Math.min(4, signalLevel)),
      text: signalText,
      distance: Math.round(distance),
    };
  };

  useEffect(() => {
    const getCurrentPosition = () => {
      if ("geolocation" in navigator) {
        setLocationStatus("LOCALISATION...");

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            const newUserPosition = [latitude, longitude];
            setUserPosition(newUserPosition);
            setLocationStatus("POSITION VERROUILLÉE");

            if (missions[currentMission] && showMapHint) {
              const targetPosition = missions[currentMission].coordinates;
              const signal = calculateSignalStrength(
                newUserPosition,
                targetPosition,
                accuracy
              );
              setSignalStrength(signal);
            } else {
              setSignalStrength({
                level: 0,
                text: "AUCUN SIGNAL - CIBLE INCONNUE",
              });
            }
          },
          (error) => {
            console.warn("Erreur de géolocalisation:", error);
            setUserPosition(null);
            setLocationStatus("SIGNAL PERDU");
            setSignalStrength({ level: 0, text: "AUCUN SIGNAL" });
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          }
        );

        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            const newUserPosition = [latitude, longitude];
            setUserPosition(newUserPosition);
            setLocationStatus("POSITION VERROUILLÉE");

            if (missions[currentMission] && showMapHint) {
              const targetPosition = missions[currentMission].coordinates;
              const signal = calculateSignalStrength(
                newUserPosition,
                targetPosition,
                accuracy
              );
              setSignalStrength(signal);
            } else {
              setSignalStrength({
                level: 0,
                text: "AUCUN SIGNAL - CIBLE INCONNUE",
              });
            }
          },
          (error) => {
            console.warn("Erreur de surveillance:", error);
            setLocationStatus("SIGNAL INSTABLE");
            setSignalStrength({ level: 1, text: "SIGNAL INSTABLE" });
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 30000,
          }
        );

        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      } else {
        setLocationStatus("GPS NON DISPONIBLE");
        setUserPosition(null);
        setSignalStrength({ level: 0, text: "AUCUN SIGNAL" });
      }
    };

    getCurrentPosition();
  }, [missions, currentMission, showMapHint]);

  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window !== "undefined" && mapRef.current) {
        try {
          const L = (await import("leaflet")).default;

          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
          });

          if (!mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapRef.current, {
              center: center,
              zoom: zoom,
              zoomControl: true,
              scrollWheelZoom: true,
            });

            L.tileLayer(
              "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
              {
                attribution: "© OpenStreetMap contributors, © CARTO",
                subdomains: "abcd",
                maxZoom: 19,
              }
            ).addTo(mapInstanceRef.current);

            // Ajouter l'event listener pour les popups
            mapInstanceRef.current.on("popupopen", (e) => {
              const popup = e.popup;
              const popupElement = popup.getElement();
              const closeBtn = popupElement.querySelector(".popup-close-btn");

              if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                  mapInstanceRef.current.closePopup(popup);
                });
              }
            });

            mapInstanceRef.current.on("moveend", () => {
              const mapCenter = mapInstanceRef.current.getCenter();
              setMapCoordinates([mapCenter.lat, mapCenter.lng]);
            });
          }

          // Nettoyer les anciens marqueurs (sauf le marqueur utilisateur)
          markersRef.current.forEach((marker) => {
            if (mapInstanceRef.current && marker !== userMarkerRef.current) {
              mapInstanceRef.current.removeLayer(marker);
            }
          });
          markersRef.current = markersRef.current.filter(
            (marker) => marker === userMarkerRef.current
          );

          // Ajouter les marqueurs de mission
          missions.forEach((mission, index) => {
            if (mission.unlocked && mapInstanceRef.current) {
              const isCurrentMission = index === currentMission;
              const isCompleted = index < currentMission;

              // Ne montrer la mission actuelle que si l'indice carte est révélé
              if (isCurrentMission && !showMapHint) {
                return; // Skip la mission actuelle si l'indice n'est pas révélé
              }

              let iconHtml = "";
              let className = "";

              if (isCompleted) {
                iconHtml = "✅";
                className = "completed-marker";
              } else if (isCurrentMission) {
                iconHtml = "🎯";
                className = "current-marker";
              } else {
                iconHtml = "📡";
                className = "available-marker";
              }

              const customIcon = L.divIcon({
                html: `<div class="spy-marker ${className}">
                         <div class="marker-pulse"></div>
                         <div class="marker-icon">${iconHtml}</div>
                       </div>`,
                className: "spy-marker-container",
                iconSize: [40, 40],
                iconAnchor: [20, 20],
              });

              const popupContent = `
  <div class="spy-popup">
    <div class="popup-header">
      <button class="popup-close-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <h3>${mission.codeName}</h3>
      <span class="classification">${mission.classification}</span>
    </div>
    <div class="popup-content">
      <p><strong>Cible:</strong> ${mission.locationName}</p>
      <p><strong>Objectif:</strong> ${mission.missionObjective}</p>
      ${
        userPosition && (isCurrentMission || isCompleted)
          ? `<p><strong>Distance:</strong> ${Math.round(
              calculateDistance(
                userPosition[0],
                userPosition[1],
                mission.coordinates[0],
                mission.coordinates[1]
              )
            )}m</p>`
          : ""
      }
    </div>
  </div>
`;

              const marker = L.marker(mission.coordinates, {
                icon: customIcon,
              })
                .addTo(mapInstanceRef.current)
                .bindPopup(popupContent, {
                  closeButton: false,
                  autoClose: false,
                  closeOnClick: false,
                  closeOnEscapeKey: true,
                  maxWidth: 300,
                  className: "custom-popup",
                });

              markersRef.current.push(marker);
            }
          });
        } catch (error) {
          console.error("Erreur lors du chargement de Leaflet:", error);
        }
      }
    };

    loadLeaflet();
  }, [missions, currentMission, center, zoom, showMapHint]);

  // Effet séparé pour gérer le marqueur utilisateur
  useEffect(() => {
    const updateUserMarker = async () => {
      if (userPosition && mapInstanceRef.current) {
        try {
          const L = (await import("leaflet")).default;

          if (userMarkerRef.current) {
            mapInstanceRef.current.removeLayer(userMarkerRef.current);
            markersRef.current = markersRef.current.filter(
              (marker) => marker !== userMarkerRef.current
            );
          }

          const userIcon = L.divIcon({
            html: `<div class="user-marker">
                   <div class="user-pulse"></div>
                   <div class="user-icon">👤</div>
                 </div>`,
            className: "user-marker-container",
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          });

          const userPopupContent = `
  <div class="spy-popup">
    <div class="popup-header">
      <button class="popup-close-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <h3>VOTRE POSITION</h3>
      <span class="classification">SÉCURISÉE</span>
    </div>
    <div class="popup-content">
      <p><strong>Statut:</strong> ${locationStatus}</p>
      <p><strong>Signal:</strong> ${signalStrength.text}</p>
      ${
        signalStrength.distance
          ? `<p><strong>Distance cible:</strong> ${signalStrength.distance}m</p>`
          : ""
      }
    </div>
  </div>
`;

          userMarkerRef.current = L.marker(userPosition, {
            icon: userIcon,
            zIndexOffset: 1000,
          })
            .addTo(mapInstanceRef.current)
            .bindPopup(userPopupContent, {
              closeButton: false,
              autoClose: false,
              closeOnClick: false,
              closeOnEscapeKey: true,
              maxWidth: 300,
              className: "custom-popup",
            });

          markersRef.current.push(userMarkerRef.current);
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour du marqueur utilisateur:",
            error
          );
        }
      }
    };

    updateUserMarker();
  }, [userPosition, locationStatus, signalStrength]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const renderSignalBars = () => {
    const bars = [];
    for (let i = 0; i < 4; i++) {
      bars.push(
        <span
          key={i}
          className={`signal-bar ${i < signalStrength.level ? "active" : ""} ${
            signalStrength.level === 4 && i === 3 ? "excellent" : ""
          }`}
        ></span>
      );
    }
    return bars;
  };

  const toggleOverlay = () => {
    setIsOverlayCollapsed(!isOverlayCollapsed);
  };

  return (
    <div className="intel-map-container">
      <div className="map-header">
        <div className="map-title">
          <h3>🛰️ INTEL SATELLITE</h3>
          <div className="signal-strength">
            {renderSignalBars()}
            <span
              className={`signal-text ${
                signalStrength.level === 4 ? "excellent" : ""
              }`}
            >
              {signalStrength.text}
            </span>
          </div>
        </div>

        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-marker completed">✅</span>
            <span>Mission Accomplie</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker current">🎯</span>
            <span>Mission Active {!showMapHint && "(Position cachée)"}</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker available">📡</span>
            <span>Objectif Identifié</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker user">👤</span>
            <span>Votre Position</span>
          </div>
        </div>
      </div>

      <div ref={mapRef} className="spy-map"></div>

      <div className={`map-overlay ${isOverlayCollapsed ? "collapsed" : ""}`}>
        <button
          onClick={toggleOverlay}
          className="overlay-toggle"
          aria-label={
            isOverlayCollapsed ? "Afficher les détails" : "Réduire les détails"
          }
        >
          {isOverlayCollapsed ? (
            <div className="collapsed-content">
              <span className="mini-status">
                {userPosition &&
                  `📍 ${
                    signalStrength.distance ? `${signalStrength.distance}m` : ""
                  }`}
              </span>
            </div>
          ) : (
            <X className="close-icon" size={16} />
          )}
        </button>
        {!isOverlayCollapsed && (
          <>
            <div className="coordinates">
              <span>CARTE - LAT: {mapCoordinates[0].toFixed(4)}</span>
              <span>CARTE - LON: {mapCoordinates[1].toFixed(4)}</span>
              {userPosition && (
                <>
                  <span>GPS - LAT: {userPosition[0].toFixed(4)}</span>
                  <span>GPS - LON: {userPosition[1].toFixed(4)}</span>
                </>
              )}
            </div>
            <div className="location-status">
              <span
                className={`status-indicator ${
                  locationStatus === "POSITION VERROUILLÉE" ? "active" : ""
                }`}
              >
                📍 {locationStatus}
              </span>
              {signalStrength.distance && showMapHint && (
                <span className="distance-indicator">
                  🎯 Distance: {signalStrength.distance}m
                </span>
              )}
              {!showMapHint && (
                <span className="hidden-target">🔒 CIBLE CACHÉE</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
