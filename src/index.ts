import { Hono } from 'hono';

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();










// Search Buses
app.get('/api/buses', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  const { source, destination } = c.req.query();

  // Validate input
  if (!source) {
    return c.json({ error: 'Source is required' }, 400);
  }

  try {
    const buses = await prisma.busTimetable.findMany({
      where: {
        source, // Filter by source
        ...(destination ? { destination } : {}), // Optionally filter by destination
      },
      orderBy: { source: 'asc' },
    });

    return c.json({ buses });
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to fetch buses' }, 500);
  }
});

// Add a Bus
// Add Multiple Buses
//app.post('/api/buses', async (c) => {
  //const prisma = new PrismaClient({
    //datasourceUrl: c.env.DATABASE_URL,
  //}).$extends(withAccelerate());

  //const buses = await c.req.json();

  // Validate input
  //if (!Array.isArray(buses) || buses.length === 0) {
    //return c.json({ error: 'Invalid input, array of buses is required' }, 400);
  //}

  //try {
    //const existingBuses = [];
    //const newBusesData = [];

    // Validate each bus object and check for existence
    //for (const bus of buses) {
      //if (!bus.source || !bus.destination || !Array.isArray(bus.departureTimes)) {
        //return c.json({ error: 'Invalid input format for one or more buses' }, 400);
      //}

      // Check if a bus with the same source and destination already exists
      //const existingBus = await prisma.busTimetable.findFirst({
        //where: {
          //source: bus.source,
          //destination: bus.destination,
        //},
      //});

      //if (existingBus) {
        //existingBuses.push({
          //source: bus.source,
          //destination: bus.destination,
        //});
     // } else {
       // newBusesData.push({
         // source: bus.source,
          //destination: bus.destination,
          //departureTimes: bus.departureTimes,
       // });
     // }
    //}

    // Insert all new buses in a single transaction
    //if (newBusesData.length > 0) {
      //await prisma.$transaction(
        //newBusesData.map((bus) =>
         // prisma.busTimetable.create({
           // data: bus,
          //})
        //)
      //);
    //}

    // Prepare the response
    //return c.json({
      //message: 'Bus addition process completed.',
      //addedBuses: newBusesData.length > 0 ? newBusesData : 'No new buses were added.',
      //existingBuses: existingBuses.length > 0 ? existingBuses : 'No buses were already present.',
    //});
  //} catch (err) {
    //console.error(err);
    //return c.json({ error: 'Failed to add buses' }, 500);
  //}
//});


// Export the app
export default app;
