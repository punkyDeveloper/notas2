import { NextResponse } from "next/server";
import { conectarMongo } from "@/libs/conectio";

export function GET(){
  conectarMongo()
  return NextResponse.json({
    message: "hola1",
    
  })
}

