import { NextResponse } from "next/server";

export async function GET() {
    try { /* empty */ } catch (error) {
        return NextResponse.json({
           message: 'An error to get data'
        }, { status: 500 });
    }
}

export async function POST() {
    try { /* empty */ } catch (error) {
        return NextResponse.json({
           message: 'An error to get data'
        },{ status: 500 });
    }
}
