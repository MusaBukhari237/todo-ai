import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/client";
import { todoSchemaAdd } from "../schema";

// Get by id
export async function GET(request: NextRequest) {
    try {
        const todo: any = await db.todo.findMany();
        let tempTodo: any = todo;

        for (let index = 0; index < todo.length; index++) {
            const item = todo[index];
            let labels = await db.label.findMany({
                where: {
                    todoId: item.id,
                }
            });
            if (!labels) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 });
            else {
                tempTodo[index].labels = labels;
            }
        }

        if (!todo) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })
        return NextResponse.json({
            success: true,
            message: "All items fetched successfully.",
            data: tempTodo
        }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }
}

// Create
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validateBody = await todoSchemaAdd.safeParse(body);

        if (!validateBody.success) return NextResponse.json({ success: false, message: "Error Occurred!", errors: validateBody.error.errors }, { status: 400 })


        const todo = await db.todo.create({
            data: body
        });

        if (!todo) return NextResponse.json({ success: false, message: "Error Occurred!" }, { status: 400 })

        return NextResponse.json({
            success: true,
            message: "Item created successfully.",
            data: todo
        }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.meta?.cause ?? "Error Occurred!" }, { status: 400 });
    }
}
