// app/api/adduser/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { database } = await connectToDatabase();
    const collection = database.collection('bloodgroup'); // Replace with your collection name

    const userData = await request.json(); // Parse the incoming JSON data

    // Insert data into the MongoDB collection
    const result = await collection.insertOne(userData);

    console.log('User inserted:', result);

    return NextResponse.json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Failed to add user:', error);
    return NextResponse.json(
      { message: 'Failed to add user', error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await disconnectFromDatabase();
  }
}
