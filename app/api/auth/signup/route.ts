import {NextResponse} from 'next/server';
import {odooExecuteKw} from '@/lib/odooClient';
import {AUTH_COOKIE, signPayload} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const {name, email, password} = await request.json();
    if (!name || !email || !password) return NextResponse.json({error: 'Missing fields'}, {status: 400});

    // Create partner
    const partnerId = await odooExecuteKw('res.partner', 'create', [[{name, email, customer_rank: 1}]]);

    // Create user linked to partner with portal access
    const userId = await odooExecuteKw('res.users', 'create', [[{login: email, password, name, partner_id: partnerId}]]);

    // Add to portal group if exists (base.group_portal id lookup)
    const groupIds = await odooExecuteKw('ir.model.data', 'get_object_reference', [['base', 'group_portal']]);
    const portalGroupId = Array.isArray(groupIds) ? groupIds[1] : null;
    if (portalGroupId) {
      await odooExecuteKw('res.users', 'write', [[userId], {groups_id: [[4, portalGroupId]]}]);
    }

    const payload = {uid: userId as number, login: email as string, name, issuedAt: Date.now()};
    const token = signPayload(payload);
    const resJson = NextResponse.json({ok: true, user: payload});
    resJson.headers.set('Set-Cookie', `${AUTH_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax`);
    return resJson;
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
} 