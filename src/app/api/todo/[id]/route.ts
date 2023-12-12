import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";
import { todoSchemaUpdate } from "../../schema";

// Get All
export async function GET(request: NextRequest, { params: { id } }: any) {
    try {
        const todo = await db.todo.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!todo) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })

        let tempTodo: any = todo;

        let labels = await db.label.findMany({
            where: {
                todoId: todo.id,
            }
        });

        if (!labels) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 });
        else {
            tempTodo.labels = labels;
        }



        return NextResponse.json({
            success: true,
            message: "Item fetched successfully.",
            data: todo
        }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }
}


// Update
export async function PUT(request: NextRequest, { params: { id } }: any) {
    try {
        const body: any = await request.json();

        const validateBody = await todoSchemaUpdate.safeParse(body);

        if (!validateBody.success) return NextResponse.json({ success: false, message: "Error Occurred!", errors: validateBody.error.errors }, { status: 400 })


        const todo = await db.todo.update({
            where: {
                id: parseInt(id)
            },
            data: body
        });

        if (!todo) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })

        return NextResponse.json({
            success: true,
            message: "Item updated successfully.",
            data: todo
        }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }

}



// Delete
export async function DELETE(request: NextRequest, { params: { id } }: any) {

    try {

        const labels = await db.label.deleteMany({
            where: {
                todoId: parseInt(id)
            }
        });

        if (!labels) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })

        const todo = await db.todo.delete({
            where: {
                id: parseInt(id)
            }
        });

        if (!todo) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })

        return NextResponse.json({
            success: true,
            message: "Item deleted successfully.",
            data: {
                todo: todo,
                labels: labels
            }
        }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }
}
