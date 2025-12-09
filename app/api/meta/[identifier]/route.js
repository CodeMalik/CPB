import { NextResponse } from "next/server";
import { connectDB as connectMongoDB } from "@/lib/mongoose";
import Meta from "@/app/models/Meta";

export async function GET(request, { params }) {
  await connectMongoDB();
  const { identifier } = params;
  try {
    const meta = await Meta.findOne({ identifier });
    if (!meta) {
      return NextResponse.json({ message: "Meta not found" }, { status: 404 });
    }
    return NextResponse.json(meta, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching meta", error },
      { status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

export async function PUT(request, { params }) {
  await connectMongoDB();
  const { identifier } = params;
  try {
    const body = await request.json();
    const updatedMeta = await Meta.findOneAndUpdate({ identifier }, body, {
      new: true,
    });
    if (!updatedMeta) {
      return NextResponse.json({ message: "Meta not found" }, { status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    return NextResponse.json(updatedMeta, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating meta", error },
      { status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

export async function DELETE(request, { params }) {
  await connectMongoDB();
  const { identifier } = params;
  try {
    const deletedMeta = await Meta.findOneAndDelete({ identifier });
    if (!deletedMeta) {
      return NextResponse.json({ message: "Meta not found" }, { status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    return NextResponse.json({ message: "Meta deleted successfully" }, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting meta", error },
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
