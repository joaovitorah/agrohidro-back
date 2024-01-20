import { prisma } from '@/lib/prisma'

export async function updatePlotUseCase(
  plotId: string,
  plotData: {
    name?: string
    area?: number
    typeOfCoffee?: string
    typeOfSoil?: string
    numberOfPlants?: number
    description?: string
    status?: string
  },
) {
  const updatedPlot = await prisma.plot.update({
    where: { id: plotId },
    data: plotData,
  })

  return updatedPlot
}
