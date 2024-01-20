import { FastifyInstance } from 'fastify'
import { addPlot } from './controller/add-plot-controller'
import { deletePlot } from './controller/delete-plot-controller'
import { deletePropertyById } from './controller/delete-property-controller'
import { getConsultationRequests } from './controller/get-consultation-controller'
import { getFieldsData } from './controller/get-fields-data-controller'
import { getFinancialData } from './controller/get-financial-controller'
import { getPlots } from './controller/get-plots-controller'
import { getPropertiesListFromUserId } from './controller/get-properties-controller'
import { getPropertyById } from './controller/get-property-controller'
import { login } from './controller/login-controller'
import { newProperty } from './controller/new-property-controller'
import { postConsultationRequest } from './controller/post-consultation-controller'
import { profile } from './controller/profile-controller'
import { register } from './controller/register-controller'
import { updatePlot } from './controller/update-plot-controller'

export async function appRoutes(app: FastifyInstance) {
  // HEALTH ROUTE
  app.get('/health', async () => {
    return 'ok'
  })

  // AUTH ROUTES
  app.post('/register', register)
  app.post('/login', login)
  app.get('/profile', profile)

  // PROPERTY ROUTES
  app.post('/properties', newProperty)
  app.get('/properties', getPropertiesListFromUserId)
  app.get('/properties/:id', getPropertyById)
  app.delete('/properties/:id', deletePropertyById)
  app.get('/properties/:id/financial-data', getFinancialData)
  app.get('/properties/:id/fields', getFieldsData)
  app.get('/properties/:id/plots', getPlots)
  app.post('/properties/:id/plots', addPlot)
  app.put('/properties/:propertyId/plots/:plotId', updatePlot)
  app.delete('/properties/:propertyId/plots/:plotId', deletePlot)

  // CONSULTATION REQUEST ROUTES
  app.post('/consultation-requests', postConsultationRequest)
  app.get('/consultation-requests', getConsultationRequests)
}
