import { NextRequest, NextResponse } from 'next/server';
import { getCart, addToCart, removeFromCart, clearCart, cartToString, CART_COOKIE, CartItem } from '@/lib/cart';
import { fetchCourses } from '@/lib/odooClient';

export async function GET(request: NextRequest) {
  try {
    const cart = getCart(request);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, courseId, productId } = await request.json();
    
    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    let cart = getCart(request);
    let response: NextResponse;

    switch (action) {
      case 'add':
        if (!courseId || !productId) {
          return NextResponse.json({ error: 'courseId and productId are required' }, { status: 400 });
        }

        // Fetch course details to ensure it exists and get current data
        const courses = await fetchCourses({ slug: courseId.toString() });
        const course = courses.find((c: any) => c.id === courseId);
        
        if (!course) {
          return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const cartItem: CartItem = {
          courseId: course.id,
          productId: course.product_id || productId,
          courseName: course.title,
          price: course.price,
          slug: course.slug,
          quantity: 1
        };

        cart = addToCart(cart, cartItem);
        response = NextResponse.json(cart);
        response.cookies.set(CART_COOKIE, cartToString(cart), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 // 7 days
        });
        break;

      case 'remove':
        if (!courseId) {
          return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
        }
        cart = removeFromCart(cart, courseId);
        response = NextResponse.json(cart);
        response.cookies.set(CART_COOKIE, cartToString(cart), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60
        });
        break;

      case 'clear':
        cart = clearCart();
        response = NextResponse.json(cart);
        response.cookies.delete(CART_COOKIE);
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return response;
  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}