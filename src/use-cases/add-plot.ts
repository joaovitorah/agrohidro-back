import { prisma } from '@/lib/prisma'

export async function addPlotUseCase(plotData: {
  name: string
  area: number
  typeOfCoffee: string
  typeOfSoil: string
  numberOfPlants: number
  description?: string
  status: string
  propertyId: string
}) {
  const newPlot = await prisma.plot.create({
    data: plotData,
  })

  return newPlot
}
