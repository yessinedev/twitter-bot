import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: { id: string };
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const id = parseInt(params.id); // Convert id to a number
    await prisma.tweet.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Tweet deleted successfully" });
  } catch (error) {
    console.error("Error deleting tweet:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
