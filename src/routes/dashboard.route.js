const { Router } = require('express')
const DashboardController = require('../controllers/Dashboardcontroller')

const dashboardRoutes = new Router()

dashboardRoutes.get('/', DashboardController.getDashboardData)

module.exports = dashboardRoutes