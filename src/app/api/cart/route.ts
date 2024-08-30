import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CrateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;
    if (!token) {
      NextResponse.json({ totalAmount: 0, items: [] });
    }
    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (err) {
    console.log("[CART_GET] Server error", err);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CrateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        id: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    });

    // если товар был найден в корзине делаем + 1

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantyty: findCartItem.quantyty + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantyty: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updateUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updateUserCart);
    resp.cookies.set("cartToken", token);

    return resp;
  } catch (err) {
    console.log("[CART_POST] Server error", err);
    return NextResponse.json(
      { message: "Не удалось добавить пиццу в корзину" },
      { status: 500 }
    );
  }
}
