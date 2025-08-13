import { NextResponse } from "next/server";
import { connectDB as connectMongoDB } from "@/lib/mongoose";
import Meta from "@/app/models/Meta";

export async function GET(request) {
  await connectMongoDB();
  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get("pageType");

  let query = {};
  if (pageType) {
    query.pageType = pageType;
  }

  try {
    const metas = await Meta.find(query);
    return NextResponse.json(metas, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching metas", error },
      { status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

export async function POST(request) {
  await connectMongoDB();
  try {
    const body = await request.json();
    const newMeta = await Meta.create(body);
    return NextResponse.json(newMeta, { status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return NextResponse.json(
        { message: "Meta with this identifier already exists." },
        { status: 409,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
    return NextResponse.json(
      { message: "Error creating meta", error },
      { status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

export async function OPTIONS(request) {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
