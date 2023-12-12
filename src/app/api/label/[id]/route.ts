import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";
import { labelSchemaAdd, labelSchemaUpdate, todoSchemaUpdate } from "../../schema";

// Get
export async function GET(request: NextRequest, { params: { id } }: any) {
    try {
        let label = await db.label.findUnique({
            where: {
                id: parseInt(id),
            }
        });

        if (!label) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 });

        return NextResponse.json({
            success: true,
            message: "Item fetched successfully.",
            data: label
        }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }
}

// Create
export async function POST(request: NextRequest, { params: { id } }: any) {
    try {
        const body: any = await request.json();

        const validateBody = await labelSchemaAdd.safeParse(body);

        if (!validateBody.success) return NextResponse.json({ success: false, message: "Error Occurred!", errors: validateBody.error.errors }, { status: 400 })

        const label = await db.label.create({
            data: {
                todoId: parseInt(id),
                title: body.title
            }
        });

        if (!label) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })

        return NextResponse.json({
            success: true,
            message: "Item created successfully.",
            data: label
        }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }

}

// Update
export async function PUT(request: NextRequest, { params: { id } }: any) {
    try {
        const body: any = await request.json();

        const validateBody = await labelSchemaUpdate.safeParse(body);

        if (!validateBody.success) return NextResponse.json({ success: false, message: "Error Occurred!", errors: validateBody.error.errors }, { status: 400 })


        const label = await db.label.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: body.title
            }
        });

        if (!label) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })

        return NextResponse.json({
            success: true,
            message: "Item updated successfully.",
            data: label
        }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }

}

// Delete
export async function DELETE(request: NextRequest, { params: { id } }: any) {
    try {

        const label = await db.label.delete({
            where: {
                id: parseInt(id)
            }
        });

        if (!label) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })

        return NextResponse.json({
            success: true,
            message: "Item deleted successfully.",
            data: label
        }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }
}


// Delete All
export async function PATCH(request: NextRequest, { params: { id } }: any) {
    try {

        const label = await db.label.deleteMany({
            where: {
                todoId: parseInt(id)
            }
        });

        if (!label) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })

        return NextResponse.json({
            success: true,
            message: "Items deleted successfully.",
            data: label
        }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }
}
