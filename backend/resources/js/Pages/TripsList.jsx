// TripsList.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { usePage } from "@inertiajs/react";
import TripCard from '../Components/TripCard'; // Your existing TripCard component

const TripsList = ({ lang = 'en' }) => {
  const { trips = [] } = usePage().props;
  const loading = false;
  const error = null;

  // Translations
  const t = {
    ar: {
      availableTrips: "الرحلات المتاحة",
      loading: "جاري التحميل...",
      error: "حدث خطأ في تحميل البيانات",
      noTrips: "لا توجد رحلات متاحة حالياً",
      tryAgain: "حاول مرة أخرى"
    },
    en: {
      availableTrips: "Available Trips",
      loading: "Loading trips...",
      error: "Error loading trips",
      noTrips: "No trips available at the moment",
      tryAgain: "Try Again"
    },
    cn: {
      availableTrips: "可用行程",
      loading: "加载中...",
      error: "加载行程时出错",
      noTrips: "目前没有可用的行程",
      tryAgain: "重试"
    }
  }[lang];

  // Fetch trips from Firestore




  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" className="me-3">
          <span className="visually-hidden">{t.loading}</span>
        </Spinner>
        <p className="mt-3">{t.loading}</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>{t.error}</Alert.Heading>
          <p>{error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={fetchTrips}
          >
            {t.tryAgain}
          </button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="mb-4 text-center">{t.availableTrips}</h2>

          {trips.length === 0 ? (
            <Alert variant="info" className="text-center">
              <p className="mb-0">{t.noTrips}</p>
            </Alert>
          ) : (
            <Row>
              {trips.map((trip) => (
                <Col key={trip.id} lg={6} xl={4} className="mb-4">
                  <TripCard
                    trip={trip}
                    lang={lang}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TripsList;
