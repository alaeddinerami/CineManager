const express  = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation.controller');
const reservationController = require('../controllers/reservation.controller');

router.post('/', ReservationController.reservePlace);
router.get('/', ReservationController.getAllReservations);
router.delete('/:id',reservationController.cancelReservation);



module.exports = router;